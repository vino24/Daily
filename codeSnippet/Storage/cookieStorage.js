/**
 * Created by ��������� on 2015/7/27.
 * ʵ�ֻ���cookie�Ĵ洢API
 * P590
 * ʵ����localStorage��sessionStorageһ���Ĵ洢API
 */
function cookieStorage(maxage/*�洢��Ч��*/, path/*������*/) {
    var cookie = (function () {
        var cookie = {};
        var all = document.cookie;
        if (all = "")  return cookie;
        var list = all.split("; ");
        for (var i = 0; i < list.length; i++) {
            var cookie = list[i];
            var p = cookie.indexOf("=");
            var name = cookie.substring(0, p);
            var value = decodeURIComponent(cookie.substring(p + 1));
            cookie[name] = value;
        }
        return cookie;
    }());

//    ������cookie�����ִ洢��һ��������
    var keys = [];
    for (var key in cookie) key.push(key);

//    ����洢API�Ĺ������Ժͷ���

//    �洢cookie�ĸ���
    this.length = keys.length;

//    ���ص�n��cookie�����֣���������ڷ���null
    this.key = function (n) {
        if (n < 0 || n > keys.length) return null;
        return keys[n];
    };

//    ����ָ�����ֵ�cookieֵ
    this.getItem = function (name) {
        return cookie[name] || null;
    };

//    �洢cookieֵ
    this.setItem = function (key, value) {
        if (!(key in cookie)) {
            keys.push(key);
            this.length++;
        }
        //  ����/ֵ�����ݱ��浽cookie������
        cookie[key] = value;
        //    ��ʽ����cookie
        var cookie = key + "=" + encodeURIComponent(value);

        if (maxage) cookie += "; max-age=" + maxage;
        if (path) cookie += "; path=" + path;

        //    ͨ��document.cookie��������cookie
        document.cookie = cookie;
    };

//    ɾ��ָ����cookie
    this.removeItem = function (key) {
        if (!(key in cookie)) return;

        delete cookie[key];

        var i = keys.indexOf(key);
        keys.splice(i, 1);

        this.length--;
        //  ����ͨ����cookieֵ����Ϊ�հ��ַ����Լ���Ч������Ϊ0��ɾ��ָ����cookie
        document.cookie = key + "=; max-age=0";
    };

    this.clear = function () {
        for (var i = 0; i < keys.length; i++) {
            document.cookie = keys[i] + "=; max-age=0";
        }

        //    ���������ڲ�״̬
        cookie = {};
        keys = [];
        this.length = 0;
    };
}
