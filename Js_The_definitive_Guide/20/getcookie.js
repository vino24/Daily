/**
 * Created by 你的特仑苏 on 2015/7/27.
 *  P589
 *  解析document.cookie属性值
 *      将cookie值以名/值对组成的一个对象返回
 */
function getcookie() {
    var cookie = {};
    var all = document.cookie;
    if (all === "")
        return cookie;
    var list = all.split("; ");   //  分离出名/值对
    for (var i = 0; i < list.length; i++) {
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.substring(0, p);
        var value = cookie.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}

