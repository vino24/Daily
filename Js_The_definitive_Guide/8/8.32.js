/**
 * Created by ��������� on 2015/5/16.
 * ��������ͨ��callee����������
 *  P176
 */
var factorial= function (x) {
    if(x<1) return 1;
    return x*arguments.callee(x-1);
};
console.log(factorial(3));  // 6
