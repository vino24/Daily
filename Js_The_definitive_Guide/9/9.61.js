/**
 * Created by 你的特仑苏 on 2015/5/19.
 * 集合类
 *  P217
 */
//  P229 重载构造函数
function Set() {
    this.values = {};     //  集合数据保存在对象的属性里
    this.n = 0;
    if (arguments.length == 1 && isArrayLike(arguments[0]))
        this.add.apply(this, arguments[0]);
    else if (arguments.length > 0)
        this.add.apply(this, arguments);
}

//  将每个参数都添加进集合中
Set.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if (!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this;    //  支持链式方法调用
};

//  从集合中删除元素，待删除元素由参数指定
Set.prototype.remove = function () {
    for (var i = o; i < arguments.length; i++) {
        var str = Set._v2s(arguments[i]);
        if (this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set_v2s(value));
};
Set.prototype.size = function () {
    return this.n;
};
Set.prototype.foreach = function (f, context) {
    for (var s in this.values) {
        if (this.values.hasOwnProperty(s))   //  忽略继承属性
            f.call(context, this.values[s]);
    }
};

//  内部函数，用以将任意JavaScript值和唯一的字符串对应起来
Set._v2s = function (val) {
    switch (val) {
        case undefined:
            return "u";
        case null:
            return "n";
        case true:
            return "t";
        case false:
            return "f";
        default :
            switch (typeof val) {
                case 'number':
                    return '#' + val;
                case 'string':
                    return '"' + val;
                default :
                    return '@' + objectId(val);
            }
    }
    function objectId(o) {
        var prop = "|**objectid**|";
        if (!o.hasOwnProperty(prop))
            o[prop] = Set._v2s.next++;
        return o[prop];
    }
};
Set._v2s.next = 100;

extend(Set.prototype, {
    toString: function () {
        var s = "{", i = 0;
        this.foreach(function (v) {
            if (i++ > 0) s += ",";
            if (v == null) s += v;
            else s += v.toLocaleString();
        });
        return s + "}";
    },
    //  将集合转换为值数组
    toArray: function () {
        var a = [];
        this.foreach(function (v) {
            a.push(v);
        });
    }
});
Set.prototype.toJSON = Set.prototype.toArray;

Set.prototype.equals = function (that) {

    //  一些次要情况的快捷处理
    if (that === this) return true;

    //  如果that对象不是一个集合
    if (!(that instanceof Set)) return false;

    if (this.size() != that.size()) return false;

    //  如果两个集合不相等，通过抛出异常来终止foreach循环
    try {
        this.foreach(function (v) {
            if (!that.contains(v)) throw false;
        });
        return true;
    } catch (x) {
        if (x === false) return false;
        throw x;
    }
};
//  把p中的可枚举属性复制到o中
function extend(o, p) {
    for (prop in p)
        o[prop] = p[prop];
    return o;
}

//  判断是否为类数组对象
function isArrayLike(o) {
    if (o &&                                    // o是非null、undefined等
        typeof o === "object" &&                // o是对象
        isFinite(o.length) &&                   // o.length是有限数值
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&    // o.length是整数
        o.length < 4294967296)
        return true;
    else
        return false;
}