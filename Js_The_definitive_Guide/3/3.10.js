/**
 * Created by 你的特仑苏 on 2015/5/4.
 */
/*
变量作用域
 */
var scope="global scope";
function checkscope() {
    var scope="local scope";
    function nested() {
        var scope="nested scope";
        return scope;
    }
    return nested();
}
checkscope();
/*
输出：
    nested scope
 */


var scope="global";
function f() {
    console.log(scope);     //undefined
    var scope="local";
    console.log(scope);     //local
}
f();


