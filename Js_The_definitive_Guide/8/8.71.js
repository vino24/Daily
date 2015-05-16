/**
 * Created by 你的特仑苏 on 2015/5/16.
 * 检测实参和形参个数是否相等
 *  P188
 */
function check(args) {
    var actual=args.length;             //  实参个数
    var expected=args.callee.length;    //  形参个数(期望实参个数)
    if(actual!=expected)
    throw Error("Error");
}

function f(x,y,z) {
    check(arguments);   //  检测实参个数和期望个数是否一致
    //  ···
}
