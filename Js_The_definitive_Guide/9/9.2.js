/**
 * Created by ��������� on 2015/5/17.
 * ʹ�ù��캯�����塰��Χ�ࡱ
 *  P204
 */
//  ���캯��
function Range(from, to) {
    this.from = from;
    this.to = to;
}

//  ���еġ���Χ���󡱶��̳����������
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
    var diff = this.from = that.from;           //  �Ƚ��±߽�
    if (diff == 0) diff = this.to - that.to;    //  �����ԣ��Ƚ��ϱ߽�
    return diff;
};

var r = new Range(1, 3);
console.log(r.includes(2));
r.foreach(console.log);
console.log(r);
