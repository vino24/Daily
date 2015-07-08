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

