/**
 * Created by ��������� on 2015/5/10.
 */
function inherit(p) {
    if (p === null) throw TypeError();
    if (Object.create)      //  ���Object.create()���� ES5
       return  Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {
    };
    f.prototype = p;
    return new f();
}