/**
 * Created by 你的特仑苏 on 2015/5/16.
 * 匿名函数通过callee来调用自身
 *  P176
 */
var factorial= function (x) {
    if(x<1) return 1;
    return x*arguments.callee(x-1);
};
console.log(factorial(3));  // 6
