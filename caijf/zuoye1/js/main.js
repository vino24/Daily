(function (window, document) {
    var doc = document;
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
    count = 0;    //  日志id
    dataList = [];    //  数据数组

    //  页面初始化
    bindEvent(window, "load", init);

    /*
     *   事件处理函数
     * */
    //  页面初始化函数
    function init() {
        getJson();
        bindBtns();
    }

    //  获取后台数据函数
    function getJson() {
        var request = new XMLHttpRequest();
        request.open("GET", "./getblogs.json");
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                callback(request.responseText);
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
        //    绑定全部删除按钮
        bindEvent(dltAllBtn, "click", deleteAll);
    }

    //  发布函数
    function publish() {
        var now = new Date(), date = [now.getFullYear(), timeBeauty(now.getMonth()), timeBeauty(now.getDate())].join("-"),
            time = " " + [timeBeauty(now.getHours()), timeBeauty(now.getMinutes()), timeBeauty(now.getSeconds())].join(":");

        arr.push(updateList(count, title.value, textarea.value, date, time));

        render(arr);
        count++;              //  更新id
        title.value = "";     //  清空标题
        textarea.value = "";  //  清空内容
    }

    //  编辑、置顶、删除函数
    function operate(e) {
        var className = e.target.className;
        var id = e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].id;
        //  删除操作
        if (className == "dlt") {

            for (var j = 0; j < arr.length; j++) {
                if (arr[j].id == id) {
                    arr = (arr.slice(0, j)).concat(arr.slice(j + 1));
                }
            }
        //    置顶操作
        } else if (className == "top") {
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].id == id) {
                    arr = [arr[j]].concat(arr.slice(0, j).concat(arr.slice(j + 1)));
                }
            }
        //    编辑操作
        } else if (className == "editor") {
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].id == id) {
                    arr = (arr.slice(0, j)).concat(arr.slice(j + 1));
                }
            }
            var elt = e.target.parentNode.parentNode;
            title.value = elt.getElementsByClassName("title")[0].getElementsByTagName("a")[0].text;
            textarea.value = elt.getElementsByClassName("article")[0].innerHTML;
        }
        /*
        else if(e.target.type=="checkbox") {
            if(e.target.checked==true) {e.target.checked==true;console.log(e.target.checked)} else e.target.checked==true;
        }*/
        render(arr);
    }

    //   全选函数
    function selectAll() {
        [].slice.call(checkboxes).forEach(function (i) {
            if (sltAllBtn.checked) {
                i.checked = true;
            } else i.checked = false;
        });
    }

    //  删除选中函数
    function deleteAll() {
        var checked = [];
        [].slice.call(checkboxes).forEach(function (i) {
            if (i.checked) {
                for (var j = 0; j < arr.length; j++) { //  不可使用forEach;不可使用len=arr.length缓存数组长度，否则数组长度无法实现更新
                    if (arr[j].id == i.id) {
                        arr = (arr.slice(0, j)).concat(arr.slice(j + 1));
                    }
                }
            }
        });
        render(arr);
        sltAllBtn.checked = false;
    }

    //  数据数组更新
    function updateList(id, title, blogContent, shortPublishDateStr, publishTimeStr, allowView, accessCount, commentCount) {
        allowView = allowView || -100;
        accessCount = accessCount || 0;
        commentCount = commentCount || 0;
        var item = {};
        item.id = id;
        item.title = title;
        item.blogContent = blogContent;
        item.shortPublishDateStr = shortPublishDateStr;
        item.publishTimeStr = publishTimeStr;
        item.allowView = allowView;
        item.accessCount = accessCount;
        item.commentCount = commentCount;
        return item;
    }

    //  数据返回处理函数
    function callback(result) {
        var res = JSON.parse(result);
        res.sort(function (a, b) {
            return b.modifyTime - a.modifyTime;
        });
        //  置顶日志
        var top = res.filter(function (item) {
            return item.rank == 5;
        });
        arr = top;
        //  非置顶日志
        var normal = res.filter(function (item) {
            return item.rank == 0;
        });
        arr = arr.concat(normal);
        render(arr);
    }

    /*
     *   公用函数
     * */

    //  渲染函数
    function render(data) {
        var html = "";
        data.forEach(function (item) {
            if (item != null) {
                html += '<div class="item"><dl class="f-21759b f-clearfix"><dt class="title"><label for="' + item.id;
                html += '">' + '</label><input type="checkbox" id="' + item.id + '"><a href="">';
                //  判断是否为私有日志
                if (item.allowView == 10000) {
                    html += '<span class="s-bg sprite-private"></span>';
                }
                html += item.title + '</a><span class="article">' + item.blogContent + '</span></dt><dd class="more"><a class="link" href="">更多<span class="u-icon"></span></a><ul><li><a href="">更多<span class="u-icon"></span></a></li> <li><a href="javascript:void(0)" class="top">置顶</a></li><li><a href="javascript:void(0)" class="dlt">删除</a></li></ul></dd><dd><a href="javascript:void(0)" class="editor">编辑</a></dd></dl><div class="data"><span class="date">' + item.shortPublishDateStr;
                html += " " + item.publishTimeStr;
                html += '</span><span class="times">阅读' + item.accessCount;
                html += '</span><span class="reviews">评论(' + item.commentCount + ')</span></div></div>';
            }
        });
        mList.innerHTML = html;
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