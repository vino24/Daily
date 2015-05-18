/**
 * Created by 你的特仑苏 on 2015/5/17.
 * Complex.js   模拟Java类继承
 *  P208
 */
/*
 实例字段
 */
function Complex(real, imaginary) {
    if (isNaN(real) || isNaN(imaginary))
        throw new TypeError();
    this.r = real;
    this.i = imaginary;
}

/*
 实例方法
 */
Complex.prototype.add = function (that) {
    return new Complex(this.r + that.r, this.i + that.i);
};
Complex.prototype.mul = function (that) {
    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
};

//  复数的模
Complex.prototype.mag = function () {
    return Math.sqrt(this.r * this.r + this.i * this.i);
};

Complex.prototype.neg = function () {
    return new Complex(-this.r, -this.i);
};

//  转换为字符串
Complex.prototype.toString = function () {
    return "{" + this.r + "," + this.i + "}";
};

//  检测两个负数是否相等
Complex.prototype.equals = function (that) {
    return that != null && that.constructor === Complex && this.r == that.r && this.i == that.i;
};

//  共轭复数
Complex.prototype.conj = function () {
    return new Complex(this.r, -this.i);
};
/*
 类字段
 */
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

/*
 类方法
 */
//  将toString（）返回的字符串格式解析为Complex对象
Complex.parse = function (s) {
    try {
        var m = Complex._format.exec(s);  //  利用正则表达式进行匹配
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    } catch (x) {
        throw new TypeError("Can't parse");
    }
};

Complex._format = /^\{([^,]+),([^}]+)\}$/;

var c = new Complex(2, 3);
var d = new Complex(c.i, c.r);
console.log(c.add(d).toString());

console.log(Complex.parse(c.toString()).add(c.neg()).equals(Complex.ZERO));
