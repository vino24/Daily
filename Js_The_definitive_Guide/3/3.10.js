/**
 * Created by ��������� on 2015/5/4.
 */
/*
����������
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
�����
    nested scope
 */


var scope="global";
function f() {
    console.log(scope);     //undefined
    var scope="local";
    console.log(scope);     //local
}
f();


