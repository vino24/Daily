/**
 * Created by ��������� on 2015/7/9.
 *  P490
 *  POST�������ʹ��ı���������
 */
function postMessage(msg) {
    var request = new XMLHttpRequest();
    request.open("POST", "log.php");
    request.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
    request.send(msg);
}
/*
 P492
 ��ȡHTTP��Ӧ��onreadystatechange
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
 ͬ����Ӧ
 */
function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);     // ͬ����Ӧ��send()����������ֱ���������
    request.send(null);

    if (request.status !== 200) throw new Error(request.statusText);

    var type = request.getResponseHeader("Content-type");
    if (!type.match(/^text/)) throw new Error(type);

    return request.responseText;
}

/*
 P493
 ����HTTP��Ӧ
 */
function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            //    ��ȡ��Ӧ������
            var type = request.getResponseHeader("Content-type");
            //    �������
            if (type.indexOf("xml") !== -1 && request.responseXML)
                callback(request.responseXML);  //Document������Ӧ
            else if (type === "application/json")
                callback(JSON.parse(request.responseText));
            else
                callback(request.responseText); //  �ַ�����Ӧ
        }
    };
    request.send();
}

/*
 P493
 ��������������
 */
// ��Ҫ����Ӧ��ΪXML�ĵ�����
request.overrideMimeType("text/plain;charset=utf-8");