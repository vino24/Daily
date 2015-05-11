/**
 * Created by 你的特仑苏 on 2015/5/10.
 */
/*
 *    用来枚举属性的对象工具函数
 */

/*
 *     把p中的可枚举属性复制到o中
 *    如果o和p中有同名属性，则覆盖
 */
function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
}
/*
 *   将p中可枚举属性复制到o中
 *   如果o和p中有同名属性，o中属性不受影响
 */
function merge(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
}

/*
* 如果o中的属性在p中没有同名属性，则从o中删除
*/
function restrict(o,p) {
    for(prop in o) {
        if(!(prop in p)) delete o[prop];
    }
    return o;
}

/*
* 如果o中属性在p中存在同名属性，则从o中删除
*/
function subtract(o,p) {
    for(prop in p) {
        delete o[prop];
    }
    return o;
}

/*
* 返回一个新对象，这个对象同时拥有o和p的属性
* 如果o和p中有重名属性，使用p的属性值
*/
function union(o,p) {
    return extend(extend({},o),p);
}

/*
* 返回一个新对象，这个对象拥有同时在o和p中出现的属性
* 很像求o p交集，但p中属性被覆盖
*/
function intersection(o,p) {
    return restrict(extend({},o),p);
}

/*
* 返回一个数组，数组包含的是o中可枚举的自有属性的值
*/
function keys(o) {
    if(typeof o!=="object") throw TypeError();
    var result=[];
    for(var prop in o) {
        if(o.hasOwnProperty(prop))
        result.push(prop);
    }
    return result;
}
