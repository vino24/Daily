(function (window, document) {
    var doc = document;
    /*
     *   dailyId 个人日志id,dataSelf 个人日志,dataFriend 好友日志
     * */
    dailyId = 0, dataSelf = [], dataFriend = [];
    /*
     *  mTags 标签栏,mList 个人日志栏,daily 好友日志栏
     * */
    var mDaily = doc.getElementById("m-daily"), mEditor = doc.getElementById("m-editor");
    var mTags = doc.getElementById("m-tags");
    var mList = doc.getElementById("m-list");
    var daily = doc.getElementById("daily"), tags = doc.getElementById("tags"), articles = doc.getElementById("articles");
    /*
     *   title 日志标题,textarea 日志内容
     * */
    var title = mEditor.getElementsByTagName("input")[0];
    var textarea = mEditor.getElementsByTagName("textarea")[0];
    var checkboxes = mList.getElementsByTagName("input");

    /*
     * pubBtn 发布按钮,clearBtn 清空按钮,sltAllBtn 全选按钮,dltAllBtn 全删按钮
     * */
    var pubBtn = doc.getElementById("pub");
    var clearBtn = doc.getElementById("clear");
    var sltAllBtn = doc.getElementById("sltall");
    var dltAllBtn = doc.getElementById("dltall");


    //  页面初始化
    bindEvent(window, "load", init);

    //  页面初始化函数
    function init() {
        getJson();
        bindBtns();
        interval = setInterval(roll, 2000);  //  好友日志滚动计时器
    }

    //  获取后台数据函数
    function getJson() {
        //  获取个人日志
        var xhr1 = new XMLHttpRequest(), xhr2 = new XMLHttpRequest();
        xhr1.open("GET", "./getblogs.json");
        xhr1.send();
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                callback1(xhr1.responseText);
            }
        }
        //  获取好友日志
        xhr2.open("GET", "./getfriends.json");
        xhr2.send();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                callback2(xhr2.responseText);
            }
        }
    }

    //  绑定按钮函数
    function bindBtns() {
        //  绑定日志栏
        bindEvent(daily, "click", function () {
            if (!daily.classList.contains("selected")) {
                daily.classList.add("selected");
                tags.classList.remove("selected");
                mDaily.classList.remove("z-hidden");
                mTags.classList.add("z-hidden");
            }
        });
        //  绑定标签栏
        bindEvent(tags, "click", function () {
            if (!tags.classList.contains("selected")) {
                tags.classList.add("selected");
                daily.classList.remove("selected");
                mTags.classList.remove("z-hidden");
                mDaily.classList.add("z-hidden");
            }
        });
        //  绑定发布按钮
        bindEvent(pubBtn, "click", publish);
        //   绑定清空按钮
        bindEvent(clearBtn, "click", clear);
        //  单篇操作
        bindEvent(mList, "click", operate);
        //  绑定全选按钮
        bindEvent(sltAllBtn, "change", selectAll);
        //  绑定全删按钮
        bindEvent(dltAllBtn, "click", deleteAll);
        //  绑定好友日志悬停操作
        bindEvent(articles, "mouseover", msover);
        //  绑定好友日志离开操作
        bindEvent(articles, "mouseout", msout);
    }

    //  发布函数
    function publish() {
        /*
         *   pos 用以区分日志是否新建
         * */
        var pos = -1, now = new Date(), date = [now.getFullYear(), timeBeauty(now.getMonth() + 1), timeBeauty(now.getDate())].join("-"),
            time = " " + [timeBeauty(now.getHours()), timeBeauty(now.getMinutes()), timeBeauty(now.getSeconds())].join(":");

        //  遍历个人日志，检查日志是否已存在
        for (var i = 0, len = dataSelf.length; i < len; i++) {
            if (dataSelf[i].id == dailyId) {
                pos = i;
            }
        }
        //  新建日志
        if (pos == -1) {
            dataSelf.push(updateList(dailyId, title.value, textarea.value, date, time));
            dailyId++;
            //  编辑日志
        } else {
            dataSelf[pos] = updateList(dailyId, title.value, textarea.value, date, time, dataSelf[pos].allowView, dataSelf[pos].accessCount, dataSelf[pos].commentCount, dataSelf[pos].rank);
        }
        render(dataSelf);
        //  清空日志编辑框
        clear();
    }

    //  编辑、置顶、删除、选择函数
    function operate(e) {
        var className = e.target.className;
        var id = e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].id;

        //  删除操作
        if (className == "dlt") {
            for (var j = 0; j < dataSelf.length; j++) {
                if (dataSelf[j].id == id) {
                    dataSelf = (dataSelf.slice(0, j)).concat(dataSelf.slice(j + 1));
                }
            }
            /*
             *   通过拆分置顶和取消置顶操作来解决JavaScript中if-else无块级作用域导致rank字段值错误进而导致操作异常的问题
             * */
            //    置顶操作
        } else if (className == "top") {
            for (var j = 0; j < dataSelf.length; j++) {
                if (dataSelf[j].id == id) {
                    dataSelf[j].rank = 5;
                    localStorage[id] = j;
                    dataSelf = [dataSelf[j]].concat(dataSelf.slice(0, j), dataSelf.slice(j + 1));
                }
            }

            //  取消置顶操作
        } else if (className == "cancel") {

            var pos = +localStorage[id];
            for (var j = 0; j < dataSelf.length; j++) {
                if (dataSelf[j].id === id) {
                    dataSelf[j].rank = 0;
                    dataSelf =(j===0)?dataSelf.slice(1, pos).concat(dataSelf[j], dataSelf.slice(pos)):dataSelf.slice(0, j).concat(dataSelf.slice(j + 1, pos), dataSelf[j], dataSelf.slice(pos));
                }
            }
            //   编辑操作
        } else if (className == "editor") {
            var elt = e.target.parentNode.parentNode;
            title.value = elt.getElementsByClassName("title")[0].getElementsByTagName("a")[0].text;
            textarea.value = elt.getElementsByClassName("article")[0].innerHTML;
            dailyId = elt.getElementsByTagName("input")[0].id;
            //   选择操作
        } else if (e.target.type == "checkbox") {
            id = e.target.id;
            for (var j = 0; j < dataSelf.length; j++) {
                if (dataSelf[j].id == id) {
                    dataSelf[j].recomBlogHome = (dataSelf[j].recomBlogHome == true) ? false : true;
                }
            }
            var checked = dataSelf.filter(function (item) {
                return item.recomBlogHome == true;
            });
            //  检查是否选择所有选项，是则更新sltAllBtn状态
            if (checked.length == dataSelf.length) sltAllBtn.checked = true;
            else sltAllBtn.checked = false;
        }
        render(dataSelf);
    }

    //   全选函数(必须通过render函数渲染checkbox)
    function selectAll() {
        if (sltAllBtn.checked) {
            dataSelf.forEach(function (item) {
                item.recomBlogHome = true;
            });
        } else {
            dataSelf.forEach(function (item) {
                item.recomBlogHome = false;
            });
        }
        render(dataSelf);
    }

    //  删除选中函数
    function deleteAll() {
        var checked = [];
        [].slice.call(checkboxes).forEach(function (i) {
            if (i.checked) {
                for (var j = 0; j < dataSelf.length; j++) { //  不可使用forEach;不可使用len=dataSelf.length缓存数组长度，否则数组长度无法实现更新
                    if (dataSelf[j].id == i.id) {
                        dataSelf = dataSelf.slice(0, j).concat(dataSelf.slice(j + 1));
                    }
                }
            }
        });
        render(dataSelf);
        sltAllBtn.checked = false;
    }

    /*
     *   个人日志数据更新
     *   @param {id} 日志id,{title} 日志标题,{blogContent} 日志内容,{shortPublishDateStr} year-mouth-day,{publishTimeStr} hour-minute-second,{allowView} 私人日志标识,
     *   {accessCount} 浏览量,{commentCount} 评论数,{recomBlogHome} 选中标识，{rank} 置顶标识
     *   @ return {object}  单条日志数据
     */
    function updateList(id, title, blogContent, shortPublishDateStr, publishTimeStr, allowView, accessCount, commentCount, recomBlogHome, rank) {
        allowView = allowView || -100, accessCount = accessCount || 0, commentCount = commentCount || 0, rank = rank || 0, recomBlogHome = false;
        var item = {};
        item.id = id;
        item.title = title;
        item.blogContent = blogContent;
        item.shortPublishDateStr = shortPublishDateStr;
        item.publishTimeStr = publishTimeStr;
        item.allowView = allowView;
        item.accessCount = accessCount;
        item.commentCount = commentCount;
        item.recomBlogHome = recomBlogHome;
        item.rank = rank;
        return item;
    }

    //  个人日志处理函数
    function callback1(result) {
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
    function callback2(result) {
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
                html += '<div class="item"><dl class="f-21759b f-clearfix"><dt class="title"><label for="'
                    + item.id + '">' + '</label><input type="checkbox"'
                    + ((item.recomBlogHome === true) ? 'checked' : ' ') + ' id="'    //  渲染checkbox
                    + item.id + '"><a href="">'
                    + ((item.allowView == 10000) ? '<span class="s-bg sprite-private"></span>' : '')      //  判断是否为私有日志
                    + item.title + '</a><span class="article">'
                    + item.blogContent + '</span></dt><dd class="more"><a class="link" href="">更多<span class="u-icon"></span></a><ul><li><a href="">更多<span class="u-icon"></span></a></li> <li><a href="javascript:void(0)" class="'
                    + ((item.rank == 0) ? 'top' : 'cancel') + '">'
                    + ((item.rank == 0) ? '置顶' : '取消') + '</a></li><li><a href="javascript:void(0)" class="dlt" id="dlt">删除</a></li></ul></dd><dd><a href="javascript:void(0)" class="editor">编辑</a></dd></dl><div class="data"><span class="date">'   //  渲染置顶/取消置顶
                    + item.shortPublishDateStr + " "
                    + item.publishTimeStr + '</span><span class="times">阅读'
                    + item.accessCount + '</span><span class="reviews">评论('
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

    //  事件绑定函数
    function bindEvent(target, type, handler) {
        if (target.addEventListener) {
            target.addEventListener(type, handler);
        }
        else if (target.attachEvent) {
            target.attachEvent('on' + type, handler);     // IE
        } else {
            target["on" + type] = handler;
        }
    }

    //  时间美化函数
    function timeBeauty(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}(this, document))