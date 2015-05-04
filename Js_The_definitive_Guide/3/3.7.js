/**
 * Created by 你的特仑苏 on 2015/5/4.
 */
/*
比较两个数组是否相等
 */
function equalArray(a,b) {
    if(a.length!=b.length) return false;

for(var i=0;i<a.length;i++)
    if(a[i]!==b[i]) return false;
return true;
}

/*
测试用例
 */
var a=[1,2,3];
var b=[1,2,3];
console.log(equalArray(a,b));