/**
 ��дһ��JavaScript�������Ը�����һ�����飬�ҳ�����**�ڶ���**��Ԫ��
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

function secondMax(arr)//�ҳ��ڶ������֣�����r���Ѽٶ�arr������������Ԫ�أ����谴�ַ���˳�������Ҫ��������������ж�Ԫ������
{
    return arr.sort(function (a, b) {
        return a - b;
    })[arr.length - 2];
}