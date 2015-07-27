/**
 * Created by ��������� on 2015/7/27.
 *  P589
 *  ����document.cookie����ֵ
 *      ��cookieֵ����/ֵ����ɵ�һ�����󷵻�
 */
function getcookie() {
    var cookie = {};
    var all = document.cookie;
    if (all === "")
        return cookie;
    var list = all.split("; ");   //  �������/ֵ��
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

