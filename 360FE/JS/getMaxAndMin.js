/**
 * Created by ��������� on 2015/6/18.
 * ʵ��һ���������ҳ�һ������������������������С��ż�����������ǵĺͣ���������������Сż������һ���������ڣ�����null
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