/**
 * 用于HTTP请求的编码对象
 *  P495
 */
function encodeFormData(data) {
    if (!data) return "";
    var pairs = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue; //跳过继承属性
        if (typeof data[name] === "function") continue; // 跳过方法
        var value = data[name].toString();    //把值转化为字符串
        name = encodeURIComponent(name.replace("%20", "+"));
        value = encodeURIComponent(value.replace("%20", "+"));
        pairs.push(name + "=" + value); // 名=值对
        return pairs.join("&"); // 返回使用“&”连接的名/值对
    }
}

/**
 * 使用表单编码数据发起HTTP POST请求
 *  P496
 */
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //调用回调函数
    };
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(encodeFormData(data));
}

/**
 * 使用表单编码数据发起HTTP GET请求
 *  当提交表单的目的仅仅是一个只读查询时，GET方法更合适
 *  P496
 */
function getData(url, data, callback) {
    var request = new XMLHttpRequest();   //  添加的编码数据获取指定的url
    request.open("GET", url + "?" + encodeFormData(data));
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);
    };
    request.send();
}

/**
 * 使用JSON编码主体发起HTTP POST请求
 *  P497
 */
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //调用回调函数
    };
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
}

/**
 * 使用XML文档作为主体发起HTTP POST请求
 *  P497
 */
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //调用回调函数
    };

    //  创建XML Document
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement;  // <query>元素
    var find = doc.createElement("find"); // 创建find元素
    query.appendChild(find);
    find.setAttribute("zipcode", where);
    find.setAttribute("radius", radius);     //  设置find属性
    find.appendChild(doc.createTextNode(what)); //设置find内容

    //  发送XML请求
    request.send(doc);
}

/**
 * 使用HTTP POST请求上传文件
 *      dataTransfer.files
 *  P498
 */
//  查找有data-upload属性的全部<input type="file">元素
window.onload = function () {
    var elts = document.getElementsByName("input");
    for (var i = 0; i < elts.length; i++) {
        var input = elts[i];
        if (input.type !== "file") continue;
        var url = input.getAttribute("data-uploadto");    //  获取上传URL
        if (!url) continue;

        input.addEventListener("change", function () {
            var file = this.files[0];     //  假设单个文件选择
            if (!file)   return;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(file);
        }, false);
    }
};

/**
 * 使用POST方法发送multipart/form-data请求主体
 *      上传文件+其他数据
 *  P499
 */

function postFormData(url, data, callback) {
    if (typeof FormData === "undefined")
        throw new Error("FormData is not support!");

    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);  //调用回调函数
    };

    var formdata = new FormData();
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        var value = data[name];
        if (typeof value === "function") continue;

        //    每个属性变成请求的一部分
        //    允许file对象
        formdata.append(name, value);
    }

    request.send(formdata);
}