/**
 * Created by 你的特仑苏 on 2015/5/17.
 * 自定义map() reduce()
 *  P195
 */
var map = Array.prototype.map ? function (a, f) {
    return a.map(f);
} : function (a, f) {
    var results = [];
    for (var i = 0; len = a.length, i < len; i++) {
        if (i in a) results[i] = f.call(null, a[i], i, a);
    }
    return results;
};

var reduce = Array.prototype.reduce ? function (a, f, initial) {
    if (arguments.length > 2) {
        return a.reduce(f, initial);
    } else return a.reduce(f);
} : function (a, f, initial) {
    var i = 0;
    len = a.length, accumulator;
    if (arguments.length > 2) accumulator = initial;
    else {
        if (len == 0) throw TypeError();
        while (i < len) {
            if (i in a) {
                accumulator = a[i++];
                break;
            }
            else i++;
        }
        if (i == len) throw TypeError();
    }
    while (i < len) {
        if (i in a)
            accumulator = f.call(undefined, accumulator, a[i], i, a);
        i++;
    }
    return accumulator;
}
