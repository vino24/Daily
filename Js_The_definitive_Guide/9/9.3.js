/**
 * Created by ��������� on 2015/5/17.
 * Complex.js   ģ��Java��̳�
 *  P208
 */
/*
 ʵ���ֶ�
 */
function Complex(real, imaginary) {
    if (isNaN(real) || isNaN(imaginary))
        throw new TypeError();
    this.r = real;
    this.i = imaginary;
}

/*
 ʵ������
 */
Complex.prototype.add = function (that) {
    return new Complex(this.r + that.r, this.i + that.i);
};
Complex.prototype.mul = function (that) {
    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
};

//  ������ģ
Complex.prototype.mag = function () {
    return Math.sqrt(this.r * this.r + this.i * this.i);
};

Complex.prototype.neg = function () {
    return new Complex(-this.r, -this.i);
};

//  ת��Ϊ�ַ���
Complex.prototype.toString = function () {
    return "{" + this.r + "," + this.i + "}";
};

//  ������������Ƿ����
Complex.prototype.equals = function (that) {
    return that != null && that.constructor === Complex && this.r == that.r && this.i == that.i;
};

//  �����
Complex.prototype.conj = function () {
    return new Complex(this.r, -this.i);
};
/*
 ���ֶ�
 */
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

/*
 �෽��
 */
//  ��toString�������ص��ַ�����ʽ����ΪComplex����
Complex.parse = function (s) {
    try {
        var m = Complex._format.exec(s);  //  ����������ʽ����ƥ��
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
