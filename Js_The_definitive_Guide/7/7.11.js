/**
 * Created by 你的特仑苏 on 2015/5/15.
 * 判断对象是否为类数组对象
 *  P162
 */
//  字符串和函数有length属性，可以用typeof检测排除，客户端JavaScript中，DOM文本节点有length属性，
// 可以用o.nodetype!=3检测排除
function isArrayLike(o) {
    if (o &&                                    // o是非null、undefined等
        typeof o === "object" &&                // o是对象
        isFinite(o.length) &&                   // o.length是有限数值
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&    // o.length是整数
        o.length < 4294967296)
        return true;
    else
        return false;
}