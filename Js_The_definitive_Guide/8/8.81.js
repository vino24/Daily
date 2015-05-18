/**
 * Created by 你的特仑苏 on 2015/5/17.
 * map() reduce() 函数式编程实现求平均值和标准差
 *  P194
 */
var sum = function (x, y) {
    return x + y;
};
var square = function (x) {
    return x * x;
};
var data=[1,2,3,4,5];
var mean=data.reduce(sum)/data.length;
var deviations=data.map(function(x){return x-mean;});
var stddev=Math.sqrt(deviations.map(square).reduce(sum)/data.length-1);
console.log(stddev);