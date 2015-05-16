/**
 * Created by 你的特仑苏 on 2015/5/16.
 * 利用闭包实现私有属性存取器方法
 *  P186
 */
/*
 函数给对象o增加了属性存储器方法
 特别之处在于getter setter函数所操作的属性值并没有存储在对象o中
 好处：
 对于两个存取器方法来说这个变量是私有的，没有办法绕过存取器方法来设置或修改这个值
 */
function addPrivateProperty(o, name, predicate) {
    var value;  //  属性值
    o["get" + name] = function () {
        return value;
    };
    o["set" + name] = function (v) {
        if (predicate && !predicate(v))
            throw Error("set" + name + ":invalid value" + v);
        else
            value = v;
    };
}

var o = {};
//  确保只允许字符串值
addPrivateProperty(o, "Name", function (x) {
    return typeof x == "string";
});

o.setName("Frank");
console.log(o.getName());   // Frank

