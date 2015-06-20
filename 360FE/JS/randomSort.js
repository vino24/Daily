/**
 * Created by 你的特仑苏 on 2015/6/19.
 * 实现一个函数，将一个有序的数组完全随机打乱顺序
 */
//  法一
function randomSort(arr) {
    if (!Array.isArray(arr) || arr.length < 2)
        return false;
    else
        return arr.sort(function () {
            return Math.random() - .5;
        });
}
//  法二
function randomSort2(arr){
    var temp,index,len=arr.length;
    for(var i=0;i<len;i++) {
        index=Math.floor(Math.random()*len);
        var temp=arr[i];
        arr[i]=arr[index];
        arr[index]=temp;
    }
    return arr;
}
console.log(randomSort2([1,2,3,4]));