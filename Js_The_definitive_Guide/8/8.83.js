/**
 * Created by 你的特仑苏 on 2015/7/3.
 * 不完全函数
 */
//  实现一个工具函数将类数组对象（对象）转换为真正的数组
//  在后面的示例代码中用到了这个函数将arguments对象转换为真正的数组
function array(a, n) {
    return [].slice.call(a, n || 0);
}

// 这个函数的实参传递至左侧
function partialLeft(f /*,...*/) {
    var args = arguments; //  保存外部的是参数组
    //console.log(args);
    return function () {
        var a = array(args, 1);   //   处理外部的args
        //console.log(arguments);
        a = a.concat(array(arguments)); // 增加内部实参
        return f.apply(this, a);
    };
}

// 这个函数的实参传递至右侧
function particalRight(f /*,...*/) {
    var args = arguments;
    return function () {
        var a = array(arguments); //  从内部参数开始
        a = a.concat(array(args, 1));
        return f.apply(this, a);
    };
}

//  这个函数的实参被用做模板
//  实参列表中的undefined值被填充
function partical(f /*,*/) {
    var args = arguments;
    return function () {
        var a = array(args, 1);
        var i = 0, j = 0;
        for (; i < a.length; i++)
            if (a[i] === undefined) a[i] = arguments[j++];
        a = a.concat(array(arguments, j));
        return f.apply(this, a);
    };
}
var f = function (x, y, z) {
    return x * (y - z);
};
console.log(partialLeft(f, 2)(3, 4));
console.log(particalRight(f, 2)(3, 4));
console.log(partical(f, undefined, 2)(3, 4));
