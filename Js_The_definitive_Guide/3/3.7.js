/**
 * Created by ��������� on 2015/5/4.
 */
/*
�Ƚ����������Ƿ����
 */
function equalArray(a,b) {
    if(a.length!=b.length) return false;

for(var i=0;i<a.length;i++)
    if(a[i]!==b[i]) return false;
return true;
}

/*
��������
 */
var a=[1,2,3];
var b=[1,2,3];
console.log(equalArray(a,b));