/**
 * Created by 你的特仑苏 on 2015/5/17.
 * 使用构造函数定义“范围类”
 *  P204
 */
//  构造函数
function Range(from, to) {
    this.from = from;
    this.to = to;
}

//  所有的“范围对象”都继承自这个对象
Range.prototype = {
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    foreach: function (f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    toString: function () {
        return "(" + this.from + "..." + this.to + ")";
    }
};
//  P224
Range.prototype.constructor = Range;
Range.prototype.equals = function (that) {
    return that != null && that.constructor === Range && that.from === this.from && that.to === this.to;
};

Range.prototype.compareTo = function (that) {
    if (!that instanceof Range)
        throw new TypeError();
    var diff = this.from = that.from;           //  比较下边界
    if (diff == 0) diff = this.to - that.to;    //  如果想对，比较上边界
    return diff;
};

var r = new Range(1, 3);
console.log(r.includes(2));
r.foreach(console.log);
console.log(r);
