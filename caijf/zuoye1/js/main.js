(function (window, document) {
    //  dailyId 个人日志id, dataSelf 个人日志数据, dataFriend 好友日志数据,isExist 日志是否新建标识, editorIndex 当前编辑位置
    dailyId = "fks_0", dataSelf = [], dataFriend = [], isExist = -1, editorIndex = -1;

    var parentNode = base.getById("j-content");
    var flags = base.getByClass("j-flag", parentNode);
    var btns = base.getByClass("j-button", parentNode);

    //  mTags 标签栏, mList 个人日志栏, daily 好友日志栏 title 日志标题, textarea 日志内容
    var mDaily = flags[0], title = flags[1], textarea = flags[2], mList = flags[3], mTags = flags[4], mFlist = flags[5];
    var daily = base.getById("daily"), tags = base.getById("tags");

    //   pubBtn 发布按钮, clearBtn 清空按钮, sltAllBtn 全选按钮, dltAllBtn 全删按钮
    var pubBtn = btns[0], clearBtn = btns[1], sltAllBtn = btns[2], dltAllBtn = btns[3];

    //  html模板
    var htmlSelf = base.getById("j-self").innerHTML, htmlFriend = base.getById("j-friend").innerHTML;
    var domain = "http://192.168.144.11/api/", params = ["deleteBlogs?id=", "topBlog?id=", "untopBlog?id=", "addBlog?blog=", "editBlog?blog="];

    //  页面初始化(<script>标签在<body>后页面元素已经可操作，无需监听window的load事件)
    init();

    //  页面初始化函数
    function init() {
        initData();
        bindBtns();
        interval = setInterval(scroll, 60);  //  好友日志滚动计时器
    }

    function initData() {
        //  获取个人日志
        base.sendXHR("./getblogs.json", "GET", null, callbackSelf);
        //  获取好友日志
        base.sendXHR("./getfriends.json", "GET", null, callbackFriend);
    }

    //  绑定按钮函数
    function bindBtns() {
        //  绑定日志栏
        base.bindEvent(daily, "click", function () {
            if (!base.hasClass(daily, "sel")) {
                base.addClass(daily, "sel");
                base.removeClass(tags, "sel");
                base.removeClass(mDaily, "z-hide");
                base.addClass(mTags, "z-hide");
            }
        });
        //  绑定标签栏
        base.bindEvent(tags, "click", function () {
            if (!base.hasClass(tags, "sel")) {
                base.addClass(tags, "sel");
                base.removeClass(daily, "sel");
                base.removeClass(mTags, "z-hide");
                base.addClass(mDaily, "z-hide");
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
        base.bindEvent(mFlist, "mouseover", msover);
        //  绑定好友日志离开操作
        base.bindEvent(mFlist, "mouseout", msout);
    }

    //  发布函数
    function publish() {
        var currentPos/* 记录当前编辑日志在日志列表的位置 */, item,
            now = new Date(),
            valTitle = base.escapeHtml(title.value),
            valText = base.escapeHtml(textarea.value),
            date = base.timeFormat(now).ymd(),
            time = base.timeFormat(now).hms();
        //  新建日志
        if (isExist == -1) {
            if (valTitle && valText) {  // 检测是否输入内容
                item = createItem(dailyId, valTitle, valText, date, time);
                send(params[3], "POST", item);
                dataSelf.push(item);
                dailyId = dailyId + 1;
                render(dataSelf);
            } else alert("Please input something...");
        }
        //  编辑日志
        else {
            currentPos = editorIndex;
            item = updateItem(dataSelf[currentPos], valTitle, valText, date, time)
            send(params[4], "POST", item);
            dataSelf[currentPos] = item;
            isExist = -1;   //  重置日志标识
            render(dataSelf);
        }
        //  清空日志编辑框
        clear();
    }

    //  获取触发事件的日志ID
    function getDaliyId(elt) {
        while (!elt.getAttribute("data-id")) {
            elt = elt.parentNode;
        }
        return elt.getAttribute("data-id");
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

    function send(parm, method, data) {
        var url = domain + parm;
        base.sendXHR(url, method, data);
    }

    //  个人日志操作函数
    function operate(e) {
        var currentTarget = base.getEventTarget(e),
            type = currentTarget.getAttribute("data-type"),
            id = getDaliyId(currentTarget),
            pos = getIndex(dataSelf, id);

        //  删除操作
        if (type == "dlt") {
            send(params[0], "GET", dataSelf[pos].id);
            dataSelf.splice(pos, 1);
            clear();
        }
        /*   置顶操作
         *   通过拆分置顶和取消置顶操作来解决JavaScript中if-else无块级作用域导致rank字段值错误进而导致操作异常的问题
         * */

        else if (type == "top") {
            send(params[1], "GET", dataSelf[pos].id);
            dataSelf[pos].rank = 5;
            dataSelf[pos].topPos = pos; //  保存日志当前位置
            dataSelf = [dataSelf[pos]].concat(dataSelf.slice(0, pos), dataSelf.slice(pos + 1));
        }
        //  取消置顶操作
        else if (type == "cancel") {
            send(params[2], "GET", dataSelf[pos].id);
            var flag = ++dataSelf[pos].topPos;  //  获取日志之前的位置索引
            dataSelf[pos].rank = 0;
            dataSelf.splice(flag, 0, dataSelf[pos]);  //  插入pos
            dataSelf.splice(pos, 1);     //  删除原本的pos
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
        send(params[0], "GET", checked.join("&"));
        render(dataSelf);
        clear();
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
        dataFriend = base.parseJSON(result);
        renderFriend(dataFriend);
    }

    //  好友日志滚动函数
    function scroll() {
        mFlist.scrollTop++;    //  滚动，scrollTop(被隐藏在内容区域上方的像素数，即滚动条位置)
        //  检测是否滚过一篇日志的距离
        if (mFlist.scrollTop % 56 == 0) {
            clearInterval(interval);    //  立即停止滚动计时器
            //  然后设置2s后执行的计时器，并在计时器内重新开启滚动计时器
            setTimeout(function () {
                interval = setInterval(scroll, 60);
            }, 2000);
        }
        //  检测是否滚动到最后，是则重置scrollTop
        if (mFlist.scrollTop > 500) {
            mFlist.scrollTop = 0;
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
        mFlist.innerHTML = html;
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
        data.sort(function (a, b) {
            return parseInt(b.modifyTime) - parseInt(a.modifyTime);
        });
    }
}(this, document))