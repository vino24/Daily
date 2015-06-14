/**
 编写一个JavaScript函数，对给定的一个数组，找出其中**第二大**的元素
 */
function findSecond(arr) {
    var a = [];
    if (!Array.isArray(arr)) return false;
    for (var i = 0; i < arr.length; i++) {
        if (a.indexOf(arr[i]) == -1)
            a.push(arr[i]);
    }
    return a.sort(function (x, y) {
        return y - x;
    })[1];
}
/*
 function findSecond(arr)
 {
 var max=Math.max.apply(null,arr);
 var arrL=arr.filter(function(v)
 {
 if(max==v)  return false;
 else  return true;
 });
 if(!arrL.length)  return false;
 else return Math.max.apply(null,arrL);
 }
 */
console.log(findSecond(4));
console.log(findSecond([2, 3, 4, 4, 3]));
console.log(findSecond("75team"));

function secondMax(arr)//找出第二大数字，在这r里已假定arr包含的是数字元素，若需按字符串顺序等其他要求排序，则可能需判断元素类型
{
    return arr.sort(function (a, b) {
        return a - b;
    })[arr.length - 2];
}