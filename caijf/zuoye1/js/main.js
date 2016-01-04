(function (window, document) {

    var base = {
        //  封装getElementById
        $: function (id) {
            return document.getElementById(id);
        },

        /*
         *   封装兼容IE的getElementsByClassName
         *   @param {className} 类名, {tagName} 指定标签名
         * */
        getByClass: function (className, tagName) {
            //  IE8+及其他高级浏览器
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className)[0];
            }
            tagName = tagName || "div";
            //  IE8及以下 遍历document文档指定的标签名集合
            var children = document.getElementsByTagName(tagName);
            //  保存遍历后得到的class元素
            var elements = new Array();

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var classNames = child.className.split(' ');   //分割多个class元素
                for (var j = 0; j < classNames.length; j++) {
                    if (classNames[j] == className) {
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements[0];
        },

        ieFixed: function () {
            if (!Array.prototype.filter) {
                //  兼容 IE filter
                Array.prototype.filter = function (fun /*, thisArg */) {
                    "use strict";
                    if (this === void 0 || this === null)
                        throw new TypeError();
                    var t = Object(this);
                    var len = t.length >>> 0;
                    if (typeof fun !== "function")
                        throw new TypeError();
                    var res = [];
                    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                    for (var i = 0; i < len; i++) {
                        if (i in t) {
                            var val = t[i];
                            if (fun.call(thisArg, val, i, t))
                                res.push(val);
                        }
                    }
                    return res;
                };
                //  兼容 IE forEach
                Array.prototype.forEach = function (fun /*, thisp*/) {
                    var len = this.length;
                    if (typeof fun != "function")
                        throw new TypeError();
                    var thisp = arguments[1];
                    for (var i = 0; i < len; i++) {
                        if (i in this)
                            fun.call(thisp, this[i], i, this);
                    }
                };
                //  兼容 IE indexOf
                Array.prototype.indexOf = function (obj) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] == obj) {
                            return i;
                        }
                    }
                    return -1;
                }
            }
        },
        /*
         *   处理XHR操作
         *   @param {url} 请求的URL, {method} 请求方法, {callback} 回调处理函数
         * */
        sendXHR: function (url, method, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr.responseText);
                }
            };
            xhr.send();
        },

        //  时间格式化函数
        dateFormat: function (i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },

        //  判断元素是否有某个class
        hasClass: function (element, ClassName) {
            var name = element.className.split(" ");
            if (name.indexOf(ClassName) !== -1)
                return true;
        },

        // 为element增加一个样式名为newClassName的新样式
        addClass: function (element, newClassName) {
            if (!base.hasClass(element, newClassName))
                element.className += " " + newClassName;
        },

        // 移除element中的样式oldClassName
        removeClass: function (element, oldClassName) {
            if (base.hasClass(element, oldClassName))
                element.className = element.className.replace(oldClassName, "");
        },

        //  事件绑定函数
        bindEvent: function (target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler);
            }
            else if (target.attachEvent) {
                target.attachEvent('on' + type, handler);     // IE
            } else {
                target["on" + type] = handler;
            }
        },
    };

    //  dailyId 个人日志id,dataSelf 个人日志,dataFriend 好友日志
    dailyId = 0, dataSelf = [], dataFriend = [];

    //  mTags 标签栏,mList 个人日志栏,daily 好友日志栏
    var mDaily = base.getByClass("m-daily"), mEditor = base.getByClass("m-editor"), mTags = base.getByClass("m-tags"), mList = base.getByClass("m-list");

    var daily = base.$("daily"), tags = base.$("tags"), articles = base.getByClass("articles");

    //   title 日志标题,textarea 日志内容
    var title = base.getByClass("j-title", "input"), textarea = base.getByClass("j-content", "textarea"), checkboxes = mList.getElementsByTagName("input");

    //   pubBtn 发布按钮,clearBtn 清空按钮,sltAllBtn 全选按钮,dltAllBtn 全删按钮
    var pubBtn = base.getByClass("j-pub", "button"), clearBtn = base.getByClass("j-clear", "button"), sltAllBtn = base.getByClass("j-sltall", "input"), dltAllBtn = base.getByClass("j-dltall", "button");

    //  页面初始化(<script>标签在<body>后页面元素已经可操作，无需监听window的load事件)
    init();

    //  页面初始化函数
    function init() {
        base.ieFixed();
        initData();
        bindBtns();
        interval = setInterval(roll, 2000);  //  好友日志滚动计时器
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
        base.bindEvent(sltAllBtn, "change", selectAll);
        //  绑定全删按钮
        base.bindEvent(dltAllBtn, "click", deleteAll);
        //  绑定好友日志悬停操作
        base.bindEvent(articles, "mouseover", msover);
        //  绑定好友日志离开操作
        base.bindEvent(articles, "mouseout", msout);
    }

    //  发布函数
    function publish() {
        //  flag 用以区分日志是否新建
        var flag = -1, now = new Date(),
            date = [now.getFullYear(), base.dateFormat(now.getMonth() + 1), base.dateFormat(now.getDate())].join("-"),
            time = " " + [base.dateFormat(now.getHours()), base.dateFormat(now.getMinutes()), base.dateFormat(now.getSeconds())].join(":");

        //  遍历个人日志，检查日志是否已存在
        for (var i = 0; i < dataSelf.length; i++) {
            if (dataSelf[i].id === dailyId) {
                flag = i;
            }
        }
        console.log(flag);
        //  新建日志
        if (flag == -1) {
            dataSelf.push(createItem(dailyId, title.value, textarea.value, date, time));
            dailyId++;
        }
        //  编辑日志
        else {
            dataSelf[flag] = updateItem(dataSelf[flag], title.value, textarea.value, date, time);
        }
        render(dataSelf);
        //  清空日志编辑框
        clear();
    }

    //  获取日志ID
    function getDaliyId(elt, type) {
        var id;
        switch (type) {
            case "editor":
                id = elt.parentNode.parentNode.parentNode.getAttribute("data-id");
            case "checkbox":
                id = elt.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
            default :
                id = elt.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
        }
        return id;
    }

    //  获取当前操作项索引
    function getIndex(data, id) {
        var index;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                index = i;
            }
        }
        return index;
    }

    //  个人日志操作函数
    function operate(e) {
        var type = e.target.getAttribute("data-type"), id = getDaliyId(e.target, type),pos = getIndex(dataSelf, id);
        //  删除操作
      //  console.log(id);
        if (type == "dlt") {
            dataSelf.splice(pos, 1);
        }
        /*   置顶操作
         *   通过拆分置顶和取消置顶操作来解决JavaScript中if-else无块级作用域导致rank字段值错误进而导致操作异常的问题
         * */
        else if (type == "top") {
            dataSelf[pos].rank=5;
            localStorage[id]=pos;
            dataSelf=[dataSelf[pos]].concat(dataSelf.slice(0, pos), dataSelf.slice(pos + 1));
        }
        //  取消置顶操作
        else if (type == "cancel") {
            var flag = ++localStorage[id];
                    dataSelf[pos].rank = 0;
                    dataSelf.splice(flag,0,dataSelf[pos]);  //  插入pos
                    dataSelf.splice(pos,1);     //  删除原本的pos
        }
        //   编辑操作
        else if (type == "editor") {
            var elt = e.target.parentNode.parentNode;
            title.value = elt.getElementsByClassName("title")[0].getElementsByTagName("a")[0].text;
            textarea.value = elt.getElementsByClassName("article")[0].innerHTML;
            dailyId = elt.getElementsByTagName("input")[0].id;
            //   选择操作
        } else if (type == "checkbox") {
            for (var j = 0; j < dataSelf.length; j++) {
                if (dataSelf[j].id == id) {
                    dataSelf[j].isChecked = (dataSelf[j].isChecked == true) ? false : true;
                }
            }
            var checked = dataSelf.filter(function (item) {
                return item.isChecked == true;
            });
            //  检查是否选择所有选项，是则更新sltAllBtn状态
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
        for (var i = 0; i < dataSelf.length; i++) {
            if (dataSelf[i].isChecked) {
                dataSelf.splice(i, 1);
                i--;    //  索引减1
            }
        }
        render(dataSelf);
        sltAllBtn.checked = false;
    }

    /*
     *   创建一条个人数据
     *   @param {id} 日志id,{title} 日志标题,{blogContent} 日志内容,{shortPublishDateStr} year-mouth-day,{publishTimeStr} hour-minute-second,{allowView} 私人日志标识,
     *   {accessCount} 浏览量,{commentCount} 评论数,{isChecked} 选中标识，{rank} 置顶标识
     *   @ return {object}  单条日志数据
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
     *   @param {id} 日志id,{title} 日志标题,{blogContent} 日志内容,{shortPublishDateStr} year-mouth-day,{publishTimeStr} hour-minute-second,{allowView} 私人日志标识,
     *   {accessCount} 浏览量,{commentCount} 评论数,{isChecked} 选中标识，{rank} 置顶标识
     *   @ return {object}  单条日志数据
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
        var res = JSON.parse(result);
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
        var res = JSON.parse(result);
        sort(res);
        dataFriend = res;
        renderFriend(dataFriend);
    }

    //  好友日志滚动函数
    function roll() {
        dataFriend.push(dataFriend.shift());
        renderFriend(dataFriend);
    }

    //  好友日志鼠标悬停函数
    function msover() {
        clearInterval(interval);
    }

    //  好友日志鼠标远离函数
    function msout() {
        interval = setInterval(roll, 2000);
    }

    //  渲染个人日志函数
    function render(data) {
        var html = "";
        data.forEach(function (item) {
            if (item) {
                html += '<div class="item" data-id="' + item.id + '"><dl class="f-21759b f-clearfix"><dt class="title"><input type="checkbox" class="j-checkbox" data-type="checkbox" '
                    + ((item.isChecked === true) ? 'checked' : ' ')     //  渲染checkbox
                    + '"><a href="">'
                    + ((item.allowView == 10000) ? '<span class="s-bg sprite-private"></span>' : '')      //  判断是否为私有日志
                    + item.title + '</a><span class="article">'
                    + item.blogContent + '</span></dt><dd class="more"><a href="">更多<span class="u-icon"></span></a><ul><li><a href="">更多<span class="u-icon"></span></a></li> <li><a href="javascript:void(0)" data-type="'
                    + ((item.rank == 0) ? 'top' : 'cancel') + '">'
                    + ((item.rank == 0) ? '置顶' : '取消') + '</a></li><li><a href="javascript:void(0)" data-type="dlt">删除</a></li></ul></dd><dd><a href="javascript:void(0)" data-type="editor">编辑</a></dd></dl><div class="data"><span>'   //  渲染置顶/取消置顶
                    + item.shortPublishDateStr + " "
                    + item.publishTimeStr + '</span><span>阅读'
                    + item.accessCount + '</span><span>评论('
                    + item.commentCount + ')</span></div></div>';
            }
        });
        mList.innerHTML = html;
    }

    //  渲染好友日志函数
    function renderFriend(data) {
        var html = '';
        data.slice(0, 5).forEach(function (item) {
            if (item != null) {
                html += '<dl class="f-clearfix"><dt><img src="'
                    + item.avtor + '" alt="" width="40" height="40"></dt><dd><a href="">'
                    + item.userName + '</a></dd><dd>'
                    + item.Content + '</dd></dl>';
            }
        });
        articles.innerHTML = html;
    }

    //  更新日志编辑栏函数
    function clear() {
        title.value = "";
        textarea.value = "";
    }

    //  排序函数
    function sort(dataSelf) {
        dataSelf.sort(function (a, b) {
            return b.modifyTime - a.modifyTime;
        });
    }

}(this, document))