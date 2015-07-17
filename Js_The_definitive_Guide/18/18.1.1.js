/**
 * Created by 你的特仑苏 on 2015/7/9.
 *  P490
 *  POST方法发送纯文本给服务器
 */
function postMessage(msg) {
    var request = new XMLHttpRequest();
    request.open("POST", "log.php");
    request.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
    request.send(msg);
}
/*
 P492
 获取HTTP响应的onreadystatechange
 */
function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status == 200) {
            var type = request.getResponseHeader("Content-type");
            if (type.match(/^text/))
                callback(request.responseText);
        }
    };
    request.send(null);
}

/*
 p492
 同步响应
 */
function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);     // 同步响应，send()方法将阻塞直到请求完成
    request.send(null);

    if (request.status !== 200) throw new Error(request.statusText);

    var type = request.getResponseHeader("Content-type");
    if (!type.match(/^text/)) throw new Error(type);

    return request.responseText;
}

/*
 P493
 解析HTTP响应
 */
function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            //    获取响应的类型
            var type = request.getResponseHeader("Content-type");
            //    检查类型
            if (type.indexOf("xml") !== -1 && request.responseXML)
                callback(request.responseXML);  //Document对象响应
            else if (type === "application/json")
                callback(JSON.parse(request.responseText));
            else
                callback(request.responseText); //  字符串响应
        }
    };
    request.send();
}

/*
 P493
 解决解码错误问题
 */
// 不要把响应作为XML文档处理
request.overrideMimeType("text/plain;charset=utf-8");