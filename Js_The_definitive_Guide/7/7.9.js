/**
 * Created by 你的特仑苏 on 2015/5/15.
 */
/*
 在数组中查找所有出现的x，并返回一个包含匹配索引的数组
 P160
 */
function findall(a, x) {
    var result = [],
        len = a.length,
        pos = 0;                    // 开始搜索的位置
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;      //  未找到，就完成搜索
        result.push(pos);
        pos += 1;                   //  从下一个位置开始搜索
    }
    return result;
}
var a = [1, 1, 2, 3];
console.log(findall(a,1))
