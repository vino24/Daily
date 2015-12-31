(function (window, document) {
    var doc = document;
    count = 0;    //  个人日志id
    dataList1 = [];   //  个人日志数据
    dataList2 = [];   //  好友日志数据
    var daily = doc.getElementById("daily");
    var tags = doc.getElementById("tags");
    var mDaily = doc.getElementsByClassName("m-daily")[0];
    var mEditor = doc.getElementById("m-editor");
    var title = mEditor.getElementsByTagName("input")[0];
    var textarea = mEditor.getElementsByTagName("textarea")[0];
    var mTags = doc.getElementById("m-tags");
    var pubBtn = doc.getElementById("pub");
    var clearBtn = doc.getElementById("clear");
    var mList = doc.getElementsByClassName("m-list")[0];
    var sltAllBtn = doc.getElementById("sltall");
    var dltAllBtn = doc.getElementById("dltall");
    var edtBtns = mList.getElementsByClassName("editor");
    var dltBtns = mList.getElementsByClassName("dlt");
    var checkboxes = mList.getElementsByTagName("input");
    var articles = doc.getElementsByClassName("articles")[0];

    //  页面初始化
    bindEvent(window, "load", init);


    //  页面初始化函数
    function init() {
        getJson();
        bindBtns();
        interval = setInterval(reFresh, 2000);
    }

    //  获取后台数据函数
    function getJson() {
        //  获取日志
        var xhr1 = new XMLHttpRequest(), xhr2 = new XMLHttpRequest();
        xhr1.open("GET", "./getblogs.json");
        xhr1.send();
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4 && xhr1.status === 200) {
                callback1(xhr1.responseText);
            }
        }
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
        bindEvent(daily, "click", function () {
            if (!daily.classList.contains("selected")) {
                daily.classList.add("selected");
                tags.classList.remove("selected");
                mDaily.classList.remove("z-hidden");
                mTags.classList.add("z-hidden");
            }
        });
        bindEvent(tags, "click", function () {
            if (!tags.classList.contains("selected")) {
                tags.classList.add("selected");
                daily.classList.remove("selected");
                mTags.classList.remove("z-hidden");
                mDaily.classList.add("z-hidden");
            }
        });

        //  发布
        bindEvent(pubBtn, "click", publish);

        //   清空
        bindEvent(clearBtn, "click", function () {
            title.value = "";
            textarea.value = "";
        });
        //  单篇操作
        bindEvent(mList, "click", operate);
        //  绑定全选按钮
        bindEvent(sltAllBtn, "change", selectAll);
        //  绑定全部删除按钮
        bindEvent(dltAllBtn, "click", deleteAll);
        //  绑定好友日志悬停
        bindEvent(articles, "mouseover", msover);
        //  绑定好友日志离开
        bindEvent(articles, "mouseout", msout);
    }

    //  发布函数
    function publish() {
        var pos = -1, now = new Date(), date = [now.getFullYear(), timeBeauty(now.getMonth()), timeBeauty(now.getDate())].join("-"),
            time = " " + [timeBeauty(now.getHours()), timeBeauty(now.getMinutes()), timeBeauty(now.getSeconds())].join(":");
        for (var i = 0; i < dataList1.length; i++) {
            if (dataList1[i].id == count) {
                pos = i;
            }
        }
        //  新建日志
        if (pos == -1) {
            dataList1.push(updateList(count, title.value, textarea.value, date, time));
            count++;
        //  编辑日志
        } else {
            dataList1[pos] = updateList(count, title.value, textarea.value, date, time,dataList1[pos].allowView,dataList1[pos].accessCount,dataList1[pos].commentCount);
        }
        render(dataList1);
        //  更新id
        title.value = "";     //  清空标题
        textarea.value = "";  //  清空内容
    }

    //  编辑、置顶、删除、选择函数
    function operate(e) {
        var className = e.target.className;
        var id = e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].id;

        //  删除操作
        if (className == "dlt") {

            for (var j = 0; j < dataList1.length; j++) {
                if (dataList1[j].id == id) {
                    dataList1 = (dataList1.slice(0, j)).concat(dataList1.slice(j + 1));
                }
            }

            //    置顶操作
        } else if (className == "top") {
            for (var j = 0; j < dataList1.length; j++) {
                if (dataList1[j].id == id) {
                    if (dataList1[j].rank == 0) {
                        dataList1[j].rank = 5;    //  置顶
                        dataList1 = [dataList1[j]].concat(dataList1.slice(0, j), dataList1.slice(j + 1));
                    } else {
                        dataList1.push(dataList1.shift());
                        dataList1[j].rank = 0;    //  取消置顶（必须要写在dataList1后面，否则会执行dataList1[j].rank=0的操作）
                    }
                }
            }

            //    编辑操作
        } else if (className == "editor") {
            var elt = e.target.parentNode.parentNode;
            title.value = elt.getElementsByClassName("title")[0].getElementsByTagName("a")[0].text;
            textarea.value = elt.getElementsByClassName("article")[0].innerHTML;
            count = elt.getElementsByTagName("input")[0].id;
            //    选择操作
        } else if (e.target.type == "checkbox") {
            id = e.target.id;
            for (var j = 0; j < dataList1.length; j++) {
                if (dataList1[j].id == id) {
                    dataList1[j].recomBlogHome = (dataList1[j].recomBlogHome == true) ? false : true;
                }
            }
            //  全选
            var checked = dataList1.filter(function (item) {
                return item.recomBlogHome == true;
            });
            if (checked.length == dataList1.length) sltAllBtn.checked = true;
            else sltAllBtn.checked = false;
        }
        render(dataList1);
    }

    //   全选函数
    function selectAll() {
        if (sltAllBtn.checked) {
            dataList1.forEach(function (item) {
                item.recomBlogHome = true;
            });
        } else {
            dataList1.forEach(function (item) {
                item.recomBlogHome = false;
            });
        }
        render(dataList1);
    }

    //  删除选中函数
    function deleteAll() {
        var checked = [];
        [].slice.call(checkboxes).forEach(function (i) {
            if (i.checked) {
                for (var j = 0; j < dataList1.length; j++) { //  不可使用forEach;不可使用len=dataList1.length缓存数组长度，否则数组长度无法实现更新
                    if (dataList1[j].id == i.id) {
                        dataList1 = (dataList1.slice(0, j)).concat(dataList1.slice(j + 1));
                    }
                }
            }
        });
        render(dataList1);
        sltAllBtn.checked = false;
    }

    //  数据数组更新
    function updateList(id, title, blogContent, shortPublishDateStr, publishTimeStr, allowView, accessCount, commentCount, recomBlogHome) {
        allowView = allowView || -100;
        accessCount = accessCount || 0;
        commentCount = commentCount || 0;
        recomBlogHome = false;
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
        dataList1 = top;
        //  非置顶日志
        var normal = res.filter(function (item) {
            return item.rank == 0;
        });
        dataList1 = dataList1.concat(normal);
        render(dataList1);
    }

    //  好友日志处理函数
    function callback2(result) {
        var res = JSON.parse(result);
        sort(res);
        dataList2 = res;
        renderFriend(dataList2);
    }

    //  好友日志刷新函数
    function reFresh() {
        dataList2.push(dataList2.shift());
        renderFriend(dataList2);
    }

    //  好友日志鼠标悬停函数
    function msover() {
        clearInterval(interval);
    }

    //  好友日志鼠标远离函数
    function msout() {
        interval = setInterval(reFresh, 2000);
    }

    //  渲染个人日志函数
    function render(data) {
        var html = "";
        data.forEach(function (item) {
            if (item != null) {
                html += '<div class="item"><dl class="f-21759b f-clearfix"><dt class="title"><label for="'
                    + item.id + '">' + '</label><input type="checkbox"'
                    + ((item.recomBlogHome === true) ? 'checked' : ' ') + ' id="'    //  渲染checkbox
                    + item.id + '"><a href="">'
                    + ((item.allowView == 10000) ? '<span class="s-bg sprite-private"></span>' : '')                //  判断是否为私有日志
                    + item.title + '</a><span class="article">' + item.blogContent + '</span></dt><dd class="more"><a class="link" href="">更多<span class="u-icon"></span></a><ul><li><a href="">更多<span class="u-icon"></span></a></li> <li><a href="javascript:void(0)" class="top">'
                    + ((item.rank == 0) ? '置顶' : '取消') + '</a></li><li><a href="javascript:void(0)" class="dlt">删除</a></li></ul></dd><dd><a href="javascript:void(0)" class="editor">编辑</a></dd></dl><div class="data"><span class="date">'   //  渲染置顶/取消置顶
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
                    + item.avtor + '" alt="好友头像" width="40" height="40"></dt><dd><a href="">'
                    + item.userName + '</a></dd><dd>'
                    + item.Content + '</dd></dl>';
            }
        });
        articles.innerHTML = html;
    }

    //  排序函数
    function sort(dataList1) {
        dataList1.sort(function (a, b) {
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