/**
 * Created by 你的特仑苏 on 2015/6/18.
 * 实现一个函数，找出一个整数数组中最大的奇数和最小的偶数，返回它们的和，如果最大奇数和最小偶数其中一个数不存在，返回null
 */
function Sum(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    var even = arr.filter(function (x) {
        return x % 2 === 0;
    });
    var max = even.length === 0 ? null : even.reduce(function (x, y) {
        return (x > y) ? y : x;
    });
    var odd = arr.filter(function (x) {
        return x % 2 === 1;
    });
    var min = odd.length === 0 ? null : odd.reduce(function (x, y) {
        return (x > y) ? x : y;
    });
    return max !== null && min !== null ? max + min : null;
}
console.log(Sum([12, 3]));