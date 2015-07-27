/**
 * Created by 你的特仑苏 on 2015/7/27.
 * 实现基于cookie的存储API
 * P590
 * 实现像localStorage和sessionStorage一样的存储API
 */
function cookieStorage(maxage/*存储有效期*/, path/*作用域*/) {
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

//    将所有cookie的名字存储到一个数组中
    var keys = [];
    for (var key in cookie) key.push(key);

//    定义存储API的公共属性和方法

//    存储cookie的个数
    this.length = keys.length;

//    返回第n个cookie的名字，如果不存在返回null
    this.key = function (n) {
        if (n < 0 || n > keys.length) return null;
        return keys[n];
    };

//    返回指定名字的cookie值
    this.getItem = function (name) {
        return cookie[name] || null;
    };

//    存储cookie值
    this.setItem = function (key, value) {
        if (!(key in cookie)) {
            keys.push(key);
            this.length++;
        }
        //  将名/值对数据保存到cookie对象中
        cookie[key] = value;
        //    正式设置cookie
        var cookie = key + "=" + encodeURIComponent(value);

        if (maxage) cookie += "; max-age=" + maxage;
        if (path) cookie += "; path=" + path;

        //    通过document.cookie属性设置cookie
        document.cookie = cookie;
    };

//    删除指定的cookie
    this.removeItem = function (key) {
        if (!(key in cookie)) return;

        delete cookie[key];

        var i = keys.indexOf(key);
        keys.splice(i, 1);

        this.length--;
        //  最终通过将cookie值设置为空白字符串以及有效期设置为0来删除指定的cookie
        document.cookie = key + "=; max-age=0";
    };

    this.clear = function () {
        for (var i = 0; i < keys.length; i++) {
            document.cookie = keys[i] + "=; max-age=0";
        }

        //    重置所有内部状态
        cookie = {};
        keys = [];
        this.length = 0;
    };
}
