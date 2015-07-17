/**
 * ����HTTP����ı������
 *  P495
 */
function encodeFormData(data) {
    if (!data) return "";
    var pairs = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue; //�����̳�����
        if (typeof data[name] === "function") continue; // ��������
        var value = data[name].toString();    //��ֵת��Ϊ�ַ���
        name = encodeURIComponent(name.replace("%20", "+"));
        value = encodeURIComponent(value.replace("%20", "+"));
        pairs.push(name + "=" + value); // ��=ֵ��
        return pairs.join("&"); // ����ʹ�á�&�����ӵ���/ֵ��
    }
}

/**
 * ʹ�ñ��������ݷ���HTTP POST����
 *  P496
 */
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //���ûص�����
    };
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeFormData(data));
}

/**
 * ʹ�ñ��������ݷ���HTTP GET����
 *  ���ύ����Ŀ�Ľ�����һ��ֻ����ѯʱ��GET����������
 *  P496
 */
function getData(url, data, callback) {
    var request = new XMLHttpRequest();   //  ��ӵı������ݻ�ȡָ����url
    request.open("GET", url + "?" + encodeFormData(data));
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);
    };
    request.send();
}

/**
 * ʹ��JSON�������巢��HTTP POST����
 *  P497
 */
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //���ûص�����
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
}

/**
 * ʹ��XML�ĵ���Ϊ���巢��HTTP POST����
 *  P497
 */
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //���ûص�����
    };

    //  ����XML Document
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement;  // <query>Ԫ��
    var find = doc.createElement("find"); // ����findԪ��
    query.appendChild(find);
    find.setAttribute("zipcode", where);
    find.setAttribute("radius", radius);     //  ����find����
    find.appendChild(doc.createTextNode(what)); //����find����

    //  ����XML����
    request.send(doc);
}

/**
 * ʹ��HTTP POST�����ϴ��ļ�
 *      dataTransfer.files
 *  P498
 */
//  ������data-upload���Ե�ȫ��<input type="file">Ԫ��
window.onload = function () {
    var elts = document.getElementsByName("input");
    for (var i = 0; i < elts.length; i++) {
        var input = elts[i];
        if (input.type !== "file") continue;
        var url = input.getAttribute("data-uploadto");    //  ��ȡ�ϴ�URL
        if (!url) continue;

        input.addEventListener("change", function () {
            var file = this.files[0];     //  ���赥���ļ�ѡ��
            if (!file)   return;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(file);
        }, false);
    }
};

/**
 * ʹ��POST��������multipart/form-data��������
 *      �ϴ��ļ�+��������
 *  P499
 */

function postFormData(url, data, callback) {
    if (typeof FormData === "undefined")
        throw new Error("FormData is not support!");

    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //���ûص�����
    };

    var formdata = new FormData();
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        var value = data[name];
        if (typeof value === "function") continue;

        //    ÿ�����Ա�������һ����
        //    ����file����
        formdata.append(name, value);
    }

    request.send(formdata);
}