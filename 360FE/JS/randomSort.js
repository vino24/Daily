/**
 * Created by ��������� on 2015/6/19.
 * ʵ��һ����������һ�������������ȫ�������˳��
 */
//  ��һ
function randomSort(arr) {
    if (!Array.isArray(arr) || arr.length < 2)
        return false;
    else
        return arr.sort(function () {
            return Math.random() - .5;
        });
}
//  ����
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