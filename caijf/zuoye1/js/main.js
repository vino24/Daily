(function (window, document) {
    var dailyId = "fks_0", // 个人日志id
        dataSelf = [],     // 个人日志数据
        dataFriend = [],   // 好友日志数据
        isExist = -1,      // 日志是否新建标识
        editorIndex = -1,  // 当前编辑位置
        editorItem={},
        operateIndex = -1; // 当前操作位置

    var parent = base.getById("j-content"),
        flags = base.getByClass("j-flag", parent),
        btns = base.getByClass("j-button", parent);

    var daily = flags[0],
        tt = flags[1],  //  日志标题
        ct = flags[2],  //  日志内容
        list = flags[3],  //  个人日志栏
        tag = flags[4],
        flist = flags[5]; //  好友日志栏

    var dailyTab = base.getById("daily"),
        tagTab = base.getById("tags");

    var pubBtn = btns[0],   //  发布按钮
        clearBtn = btns[1], //  清空按钮
        sltAllBtn = btns[2], // 全选按钮
        dltAllBtn = btns[3]; // 全删按钮

    //  html模板
    var htmlSelf = base.getById("j-self").innerHTML,
        htmlFriend = base.getById("j-friend").innerHTML;
    var url = "./xhr.json/";

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
        base.sendXHR("./getblogs.json", cbSelf);
        //  获取好友日志
        base.sendXHR("./getfriends.json", cbFriend);
    }

    //  绑定按钮函数
    function bindBtns() {
        //  绑定日志栏
        base.bindEvent(dailyTab, "click", function () {
            if (!base.hasClass(dailyTab, "z-sel")) {
                base.addClass(dailyTab, "z-sel");
                base.removeClass(tagTab, "z-sel");
                base.removeClass(daily, "z-hide");
                base.addClass(tag, "z-hide");
            }
        });
        //  绑定标签栏
        base.bindEvent(tagTab, "click", function () {
            if (!base.hasClass(tagTab, "z-sel")) {
                base.addClass(tagTab, "z-sel");
                base.removeClass(dailyTab, "z-sel");
                base.removeClass(tag, "z-hide");
                base.addClass(daily, "z-hide");
            }
        });
        //  绑定发布按钮
        base.bindEvent(pubBtn, "click", publish);
        //   绑定清空按钮
        base.bindEvent(clearBtn, "click", clear);
        //  单篇操作
        base.bindEvent(list, "click", operate);
        //  绑定全选按钮
        base.bindEvent(sltAllBtn, "click", selectAll);
        //  绑定全删按钮
        base.bindEvent(dltAllBtn, "click", deleteAll);
        //  绑定好友日志悬停操作
        base.bindEvent(flist, "mouseover", function () {
            clearInterval(interval);
        });
        //  绑定好友日志离开操作
        base.bindEvent(flist, "mouseout", function () {
            interval = setInterval(scroll, 60);
        });
    }
    //  发布函数
    function publish() {
        var now = new Date(),
            valTitle = base.escapeHtml(tt.value),
            valText = base.escapeHtml(ct.value),
            date = base.timeFormat(now).ymd(),
            time = base.timeFormat(now).hms();
        //  新建日志
        if (isExist == -1) {
            if (valTitle && valText) {  // 检测是否输入内容
                editorItem = createItem(dailyId, valTitle, valText, date, time);
                send(editorItem, cbNew, "POST");

            } else alert("Please input something...");
        }
        //  编辑日志
        else {
            editorItem = updateItem(dataSelf[editorIndex], valTitle, valText, date, time)
            send(editorItem, cbEdt, "POST");
        }
        //  清空日志编辑框
        clear();
    }

    //  个人日志操作函数
    function operate(e) {
        var currentTarget = base.getEventTarget(e),
            type = currentTarget.getAttribute("data-type"),
            id = getDaliyId(currentTarget);
        operateIndex = getIndex(dataSelf, id);

        switch (type) {
            //  删除操作
            case "dlt":
                send(dataSelf[operateIndex].id, cbDlt);
                break;
            /*   置顶操作
             *   通过拆分置顶和取消置顶操作来解决JavaScript中if-else无块级作用域导致rank字段值错误进而导致操作异常的问题
             * */

            case "top":
                send(dataSelf[operateIndex].id, cbTop);
                break;
            //  取消置顶操作
            case "cancel":
                send(dataSelf[operateIndex].id, cbCl);
                break;
            //   编辑操作
            case "editor":
                tt.value = dataSelf[operateIndex].title;
                ct.value = dataSelf[operateIndex].blogContent;
                isExist = 1;    //  更改日志标识
                editorIndex = operateIndex;   //  存储当前操作项位置
                break;
            //   选择操作
            default :
                dataSelf[operateIndex].isChecked = !dataSelf[operateIndex].isChecked;   //  状态反转
                //  检查是否选择所有选项，是则更新sltAllBtn状态
                var checked = dataSelf.filter(function (item) {
                    return item.isChecked == true;
                });
                if (checked.length == dataSelf.length) sltAllBtn.checked = true;
                else sltAllBtn.checked = false;
                break;
        }
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
        send(checked.join("&"), cbDltAll);
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

    //  新建日志回调
    function cbNew(result) {
        result = base.parseJSON(result);
        if (result.code == 200) {
            dataSelf.push(editorItem);
            dailyId = dailyId + 1;
            render(dataSelf);
        } else alert("Edit failure!");
    }

    //  编辑日志回调
    function cbEdt(result) {
        result = base.parseJSON(result);
        if (result.code == 200) {
            dataSelf[editorIndex] = editorItem;
            isExist = -1;   //  重置日志标识
            render(dataSelf);
        } else alert("Edit failure!");
    }

    //  删除日志回调
    function cbDlt(result) {
        result = base.parseJSON(result);
        if (result.code == 200) {
            dataSelf.splice(operateIndex, 1);
            clear();
            render(dataSelf);
        } else alert("Operate failure!");
    }

    //  置顶日志回调
    function cbTop(result) {
        result = base.parseJSON(result);
        if (result.code == 200) {
            dataSelf[operateIndex].rank = 5;
            dataSelf[operateIndex].topPos = operateIndex; //  保存日志当前位置
            dataSelf = [dataSelf[operateIndex]].concat(dataSelf.slice(0, operateIndex), dataSelf.slice(operateIndex + 1));
            render(dataSelf);
        } else alert("Operate failure!");
    }

    //  取消置顶回调
    function cbCl(result) {
        result = base.parseJSON(result);
        if (result.code == 200) {
            var flag = ++dataSelf[operateIndex].topPos;  //  获取日志之前的位置索引
            dataSelf[operateIndex].rank = 0;
            dataSelf.splice(flag, 0, dataSelf[operateIndex]);  //  插入pos
            dataSelf.splice(operateIndex, 1);     //  删除原本的pos
            render(dataSelf);
        } else alert("Operate failure!");
    }

    //  删除日志回调
    function cbDlt(result) {
        result = base.parseJSON(result);
        if (result.code == 200) {
            dataSelf.splice(operateIndex, 1);
            clear();
            render(dataSelf);
        } else alert("Operate failure!");
    }

    //  批量删除回调
    function cbDltAll(result) {
        result = base.parseJSON(result);
        if (result.code == 200) {
            render(dataSelf);
            clear();
            sltAllBtn.checked = false;
        } else alert("Operate failure!");
    }

    //  个人日志处理函数
    function cbSelf(result) {
        var res = base.parseJSON(result);
        base.sort(res, "modifyTime");

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
    function cbFriend(result) {
        dataFriend = base.parseJSON(result);
        renderFriend(dataFriend);
    }

    //  好友日志滚动函数
    function scroll() {
        flist.scrollTop++;    //  滚动，scrollTop(被隐藏在内容区域上方的像素数，即滚动条位置)
        //  检测是否滚过一篇日志的距离
        if (flist.scrollTop % 59 == 0) {
            clearInterval(interval);    //  立即停止滚动计时器
            //  然后设置2s后执行的计时器，并在计时器内重新开启滚动计时器
            setTimeout(function () {
                interval = setInterval(scroll, 60);
            }, 2000);
        }
        //  检测是否滚动到最后，是则重置scrollTop
        if (flist.scrollTop > 500) {
            flist.scrollTop = 0;
        }
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
                html += tplEngine(htmlSelf, obj);
            }
        });
        list.innerHTML = html;
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
                html += tplEngine(htmlFriend, obj);
            }
        });
        flist.innerHTML = html;
    }

    /*  模板引擎函数
     *  @param {str} 待替换字符串 {data} 替换数据
     * */
    function tplEngine(str, data) {
        return str.replace(/\{([^\}]+)?\}/g, function (s0, s1) {
            return data[s1];
        });
    }

    function send(data, cb) {
        if (arguments.length == 3) base.sendXHR(url, cb, data);
        else base.sendXHR(url, cb);
    }
    //  清空日志编辑栏函数
    function clear() {
        tt.value = "";
        ct.value = "";
    }

}(this, document))