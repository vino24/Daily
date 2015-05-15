/**
 * Created by 你的特仑苏 on 2015/5/8.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return Object.prototype.toString().call(arr)==="[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return typeof fn==="js";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    //对于 数字 字符串 布尔 null undefined
    if (src == null || typeof src != "object")
        return src;
    //对于 Date
    else if (src instanceof Date) {
        var clone;
        clone = new Date(src);
        return clone;
    }
    // 对于 数组
    else if (src instanceof Array) {
        var clone = [];
        for (var i in src)
            clone[i] = src[i];
        return clone;
        // 对于 Object
    } else if (src instanceof Object) {
        var clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key))    // 忽略继承属性
                clone[key] = cloneObject(src[key]); //递归
                //  clone[key]=src[key]; 结果一致 可能是由于是引用类型所致
        }
        return clone;
    }
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var element = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            element++;
        }
    }
    return element;
}
