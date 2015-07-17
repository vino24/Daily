/**
 * Created by 你的特仑苏 on 2015/7/15.
 *  CORS - 跨域资源共享
 *      P504
 *      linkdetails.js
 */

//  使用HEAD和CORS请求链接详细信息

window.onload = function () {
    //  是否支持跨域请求
    var supportCORS = (new XMLHttpRequest()).withCredentials !== undefined;

//    遍历文档所有链接
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (!link.href) continue;
        if (link.title) continue;

        //    如果这是一个跨域链接
        if (link.host !== location.host || link.protocol !== location.protocol) {
            link.title = "站外链接";
            if (!supportCORS) continue;
        }

        //    注册事件处理程序，当鼠标悬停时下载链接详细信息
        if (link.addEventListener)
            link.addEventListener("mouseover", onmouseoverHandler, false);
        else
            link.attachEvent("onmouseover", onmouseoverHandler);
    }

    function onmouseoverHandler(e) {
        var link = e.target || e.srcElement;    // <a>元素
        var url = link.href;

        var req = new XMLHttpRequest();
        req.open("HEAD", url);   //  仅仅询问头信息
        req.onreadystatechange = function () {
            if (req.readyState !== 4) return;
            if (req.status === 200) {
                var type = req.getResponseHeader("Content-Type");
                var size = req.getResponseHeader("Content-Length");
                var date = req.getResponseHeader("Last-Modified");

                //    在工具提示中显示详细信息
                link.title = "类型：" + type + "\n" +
                    "大小：" + size + "\n" + "时间：" + date;
            }
            else {
                if (!link.title)
                    link.title = "Couldn't fetch details:\n" +
                        req.status + " " + req.statusText;
            }
        };
        req.send(null);

        //  移除处理程序
        if (link.removeEventListener)
            link.removeEventListener("mouseover", onmouseoverHandler, false);
        else
            link.detachEvent("onmouseover", onmouseoverHandler);
    }
}
