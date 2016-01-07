(function (window, document) {
    //  dailyId 个人日志id, dataSelf 个人日志数据, dataFriend 好友日志数据,isExist 日志是否新建标识, editorIndex 当前编辑位置
    dailyId = "fks_0", dataSelf = [], dataFriend = [], isExist = -1, editorIndex = -1;

    //  mTags 标签栏, mList 个人日志栏, daily 好友日志栏
    var mDaily = base.getByClass("m-daily"), mEditor = base.getByClass("m-editor"), mTags = base.getByClass("m-tags"), mList = base.getByClass("m-list");
    var daily = base.$("daily"), tags = base.$("tags"), articles = base.getByClass("articles");

    //   title 日志标题, textarea 日志内容
    var title = base.getByClass("j-title", "input"), textarea = base.getByClass("j-content", "textarea"), checkboxes = mList.getElementsByTagName("input");

    //   pubBtn 发布按钮, clearBtn 清空按钮, sltAllBtn 全选按钮, dltAllBtn 全删按钮
    var pubBtn = base.getByClass("j-pub", "button"), clearBtn = base.getByClass("j-clear", "button"), sltAllBtn = base.getByClass("j-sltall", "input"), dltAllBtn = base.getByClass("j-dltall", "button");
    //  滚动日志栏
    var rollElt = base.getByClass("articles");
    //  html模板
    var htmlSelf = base.$("j-self").innerHTML, htmlFriend = base.$("j-friend").innerHTML;
    //  页面初始化(<script>标签在<body>后页面元素已经可操作，无需监听window的load事件)
    init();

    //  页面初始化函数
    function init() {
        base.ieFixed(); //  载入ieFixed，消除浏览器差异
        initData();
        bindBtns();
        interval = setInterval(scroll, 60);  //  好友日志滚动计时器
    }

    function initData() {
        //  获取个人日志
        base.sendXHR("./getblogs.json", "GET", callbackSelf);
        //  获取好友日志
        base.sendXHR("./getfriends.json", "GET", callbackFriend);
    }

    //  绑定按钮函数
    function bindBtns() {
        //  绑定日志栏
        base.bindEvent(daily, "click", function () {
            if (!base.hasClass(daily, "selected")) {
                base.addClass(daily, "selected");
                base.removeClass(tags, "selected");
                base.removeClass(mDaily, "z-hidden");
                base.addClass(mTags, "z-hidden");
            }
        });
        //  绑定标签栏
        base.bindEvent(tags, "click", function () {
            if (!base.hasClass(tags, "selected")) {
                base.addClass(tags, "selected");
                base.removeClass(daily, "selected");
                base.removeClass(mTags, "z-hidden");
                base.addClass(mDaily, "z-hidden");
            }
        });
        //  绑定发布按钮
        base.bindEvent(pubBtn, "click", publish);
        //   绑定清空按钮
        base.bindEvent(clearBtn, "click", clear);
        //  单篇操作
        base.bindEvent(mList, "click", operate);
        //  绑定全选按钮
        base.bindEvent(sltAllBtn, "click", selectAll);
        //  绑定全删按钮
        base.bindEvent(dltAllBtn, "click", deleteAll);
        //  绑定好友日志悬停操作
        base.bindEvent(articles, "mouseover", msover);
        //  绑定好友日志离开操作
        base.bindEvent(articles, "mouseout", msout);
    }

    //  发布函数
    function publish() {
        var url, currentPos/* 记录当前编辑日志在日志列表的位置 */,
            now = new Date(),
            valTitle = base.escapeHtml(title.value),
            valText = base.escapeHtml(textarea.value),
            date = [now.getFullYear(), base.timeFormat(now.getMonth() + 1), base.timeFormat(now.getDate())].join("-") + " ",
            time = [base.timeFormat(now.getHours()), base.timeFormat(now.getMinutes()), base.timeFormat(now.getSeconds())].join(":");
        //  新建日志
        if (isExist == -1) {
            if (valTitle && valText) {  // 检测是否输入内容
                dataSelf.push(createItem(dailyId, valTitle, valText, date, time));
                url = "http://192.168.144.11/api/addBlog?blog={" + encodeURIComponent(dataSelf[dataSelf.length - 1].title) + encodeURIComponent(dataSelf[dataSelf.length - 1].blogContent) + "}";
                dailyId = dailyId + 1;
            } else alert("Please input something...");
        }
        //  编辑日志
        else {
            currentPos = editorIndex;
            dataSelf[currentPos] = updateItem(dataSelf[currentPos], valTitle, valText, date, time);
            url = "http://192.168.144.11/api/untopBlog?id=" + encodeURIComponent(dataSelf[currentPos].id);
            isExist = -1;   //  重置日志标识
        }
        // base.sendXHR(url, "POST");
        render(dataSelf);
        //  清空日志编辑框
        clear();
    }

    //  获取触发事件的日志ID
    function getDaliyId(elt, type) {
        var id;
        switch (type) {
            case 'editor':
                id = elt.parentNode.parentNode.parentNode.getAttribute("data-id");
                break;
            case "checkbox":
                id = elt.parentNode.parentNode.parentNode.getAttribute("data-id");
                break;
            default :
                id = elt.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
        }
        return id;
    }

    //  获取当前操作项索引
    function getIndex(data, id) {
        var index;
        for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].id == id) {
                index = i;
            }
        }
        return index;
    }

    //  个人日志操作函数
    function operate(e) {
        var url,
            currentTarget = e.target || e.srcElement,
            type = currentTarget.getAttribute("data-type"),
            id = getDaliyId(currentTarget, type), pos = getIndex(dataSelf, id);

        //  删除操作
        if (type == "dlt") {
            //url = "http://192.168.144.11/api/deleteBlogs?id=" + encodeURIComponent(dataSelf[pos].id);
            //base.sendXHR(url, "GET");
            dataSelf.splice(pos, 1);
        }
        /*   置顶操作
         *   通过拆分置顶和取消置顶操作来解决JavaScript中if-else无块级作用域导致rank字段值错误进而导致操作异常的问题
         * */

        else if (type == "top") {
            dataSelf[pos].rank = 5;
            dataSelf[pos].topPos = pos; //  保存日志当前位置
            dataSelf = [dataSelf[pos]].concat(dataSelf.slice(0, pos), dataSelf.slice(pos + 1));
            //url = "http://192.168.144.11/api/topBlog?id=" + encodeURIComponent(dataSelf[pos].id);
            //base.sendXHR(url, "GET");
        }
        //  取消置顶操作
        else if (type == "cancel") {
            var flag = ++dataSelf[pos].topPos;  //  获取日志之前的位置索引
            dataSelf[pos].rank = 0;
            dataSelf.splice(flag, 0, dataSelf[pos]);  //  插入pos
            dataSelf.splice(pos, 1);     //  删除原本的pos
            //url = "http://192.168.144.11/api/untopBlog?id=" + encodeURIComponent(dataSelf[pos].id);
            //base.sendXHR(url, "GET");
        }
        //   编辑操作
        else if (type == "editor") {
            title.value = dataSelf[pos].title;
            textarea.value = dataSelf[pos].blogContent;
            isExist = 1;    //  更改日志标识
            editorIndex = pos;   //  存储当前操作项位置
        }
        //   选择操作
        else if (type == "checkbox") {
            dataSelf[pos].isChecked = (dataSelf[pos].isChecked == true) ? false : true;

            //  检查是否选择所有选项，是则更新sltAllBtn状态
            var checked = dataSelf.filter(function (item) {
                return item.isChecked == true;
            });
            if (checked.length == dataSelf.length) sltAllBtn.checked = true;
            else sltAllBtn.checked = false;
        }
        render(dataSelf);
    }

    //   全选函数
    function selectAll() {
        if (sltAllBtn.checked) {
            dataSelf.forEach(function (item) {
                item.isChecked = true;
            });
        } else {
            dataSelf.forEach(function (item) {
                item.isChecked = false;
            });
        }
        render(dataSelf);
    }

    //  删除选中函数
    function deleteAll() {
        var checked = [];
        for (var i = 0; i < dataSelf.length; i++) {
            if (dataSelf[i].isChecked) {
                checked.push(dataSelf[i].id);
                dataSelf.splice(i, 1);
                i--;    //  索引减1
            }
        }
        var url = "http://192.168.144.11/api/deleteBlogs?id=" + encodeURIComponent(checked.join("&"));
        // base.sendXHR(url, "GET");
        render(dataSelf);
        sltAllBtn.checked = false;
    }

    /*
     *   新建一条个人数据
     *   @param {id} 日志id,{title} 日志标题,{blogContent} 日志内容,{shortPublishDateStr} year-mouth-day,{publishTimeStr} hour-minute-second,
     *          {allowView} 私人日志标识,{accessCount} 浏览量,{commentCount} 评论数,{isChecked} 选中标识，{rank} 置顶标识
     *   @return {object}  单条日志数据
     */
    function createItem(id, title, blogContent, shortPublishDateStr, publishTimeStr) {
        var item = {};
        item.id = id;
        item.title = title;
        item.blogContent = blogContent;
        item.shortPublishDateStr = shortPublishDateStr;
        item.publishTimeStr = publishTimeStr;
        item.allowView = -100;
        item.accessCount = 0;
        item.commentCount = 0;
        item.isChecked = false;
        item.rank = 0;
        return item;
    }

    /*
     *   更新一条个人数据
     *   @param {title} 日志标题,{blogContent} 日志内容,{shortPublishDateStr} year-mouth-day,{publishTimeStr} hour-minute-second
     *   @return {object}  单条日志数据
     */
    function updateItem(item, title, blogContent, shortPublishDateStr, publishTimeStr) {
        item.title = title;
        item.blogContent = blogContent;
        item.shortPublishDateStr = shortPublishDateStr;
        item.publishTimeStr = publishTimeStr;
        return item;
    }

    //  个人日志处理函数
    function callbackSelf(result) {
        var res = base.parseJSON(result);
        sort(res);

        //  置顶日志
        var top = res.filter(function (item) {
            return item.rank == 5;
        });
        dataSelf = top;
        //  非置顶日志
        var normal = res.filter(function (item) {
            return item.rank == 0;
        });
        dataSelf = dataSelf.concat(normal);
        render(dataSelf);
    }

    //  好友日志处理函数
    function callbackFriend(result) {
        var res = base.parseJSON(result);
        sort(res);
        dataFriend = res;
        renderFriend(dataFriend);
    }

    //  好友日志滚动函数
    function scroll() {
        rollElt.scrollTop++;    //  滚动，scrollTop(被隐藏在内容区域上方的像素数，即滚动条位置)
        //  检测是否滚过一篇日志的距离
        if (rollElt.scrollTop % 56 == 0) {
            clearInterval(interval);    //  立即停止滚动计时器
            //  然后设置2s后执行的计时器，并在计时器内重新开启滚动计时器
            setTimeout(function () {
                interval = setInterval(scroll, 60);
            }, 2000);
        }
        //  检测是否滚动到最后，是则重置scrollTop
        if (rollElt.scrollTop > 500) {
            rollElt.scrollTop = 0;
        }
    }

    //  好友日志鼠标悬停函数
    function msover() {
        clearInterval(interval);
    }

    //  好友日志鼠标远离函数
    function msout() {
        interval = setInterval(scroll, 60);
    }

    //  渲染个人日志函数
    function render(data) {
        var html = "";
        data.forEach(function (item) {
            if (item) {
                var isChecked = (item.isChecked === true) ? 'checked' : ' ',
                    allowView = (item.allowView == 10000) ? '<span class="s-bg sprite-private"></span>' : '',
                    dataType = (item.rank == 0) ? 'top' : 'cancel',
                    text = (item.rank == 0) ? '置顶' : '取消';
                var obj = {
                    "id": item.id,
                    "isChecked": isChecked,
                    "allowView": allowView,
                    "title": item.title,
                    "blogContent": item.blogContent,
                    "data-type": dataType,
                    "text": text,
                    "shortPublishDateStr": item.shortPublishDateStr,
                    "publishTimeStr": item.publishTimeStr,
                    "accessCount": item.accessCount,
                    "commentCount": item.commentCount
                };
                html += tplEngine(htmlSelf, /\{([^\}]+)?\}/g, function (s0, s1) {
                    return obj[s1];
                });
            }
        });
        mList.innerHTML = html;
    }

    //  渲染好友日志函数
    function renderFriend(data) {
        var html = '';
        data.forEach(function (item) {
            if (item) {
                var obj = {
                    "avtor": item.avtor,
                    "userName": item.userName,
                    "Content": item.Content
                };
                html += tplEngine(htmlFriend, /\{([^\}]+)?\}/g, function (s0, s1) {
                    return obj[s1];
                });
            }
        });
        articles.innerHTML = html;
    }

    /*  模板引擎函数
     *  @param {str} 要替换的字符串 {reg} 字符串替换的正则表达式 {fn} replace内传入的函数参数
     * */
    function tplEngine(str, reg, fn) {
        return str.replace(reg, fn);
    }

    //  清空日志编辑栏函数
    function clear() {
        title.value = "";
        textarea.value = "";
    }

    //  排序函数
    function sort(data) {
        //  IE6+(无法使用Array.prototype.sort作为判定，IE6有sort函数，但表现与其他浏览器不同)
        if (!base.isIE6()) {
            data.sort(function (a, b) {
                return parseInt(b.modifyTime) - parseInt(a.modifyTime);
            });
        }
        //  IE6
        else {
            var a, len = data.length;
            for (var i = 0; i < len; i++) {
                for (j = i + 1; j < len; j++) {
                    if (parseInt(data[i].modifyTime) < parseInt(data[j].modifyTime)) {
                        a = data[i];
                        data[i] = data[j];
                        data[j] = a;
                    }
                }
            }
        }
    }
}(this, document))