/**
 * Created by ��������� on 2015/5/19.
 * ������
 *  P217
 */
//  P229 ���ع��캯��
function Set() {
    this.values = {};     //  �������ݱ����ڶ����������
    this.n = 0;
    if (arguments.length == 1 && isArrayLike(arguments[0]))
        this.add.apply(this, arguments[0]);
    else if (arguments.length > 0)
        this.add.apply(this, arguments);
}

//  ��ÿ����������ӽ�������
Set.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if (!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this;    //  ֧����ʽ��������
};

//  �Ӽ�����ɾ��Ԫ�أ���ɾ��Ԫ���ɲ���ָ��
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
        if (this.values.hasOwnProperty(s))   //  ���Լ̳�����
            f.call(context, this.values[s]);
    }
};

//  �ڲ����������Խ�����JavaScriptֵ��Ψһ���ַ�����Ӧ����
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
    //  ������ת��Ϊֵ����
    toArray: function () {
        var a = [];
        this.foreach(function (v) {
            a.push(v);
        });
    }
});
Set.prototype.toJSON = Set.prototype.toArray;

Set.prototype.equals = function (that) {

    //  һЩ��Ҫ����Ŀ�ݴ���
    if (that === this) return true;

    //  ���that������һ������
    if (!(that instanceof Set)) return false;

    if (this.size() != that.size()) return false;

    //  ����������ϲ���ȣ�ͨ���׳��쳣����ֹforeachѭ��
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
//  ��p�еĿ�ö�����Ը��Ƶ�o��
function extend(o, p) {
    for (prop in p)
        o[prop] = p[prop];
    return o;
}

//  �ж��Ƿ�Ϊ���������
function isArrayLike(o) {
    if (o &&                                    // o�Ƿ�null��undefined��
        typeof o === "object" &&                // o�Ƕ���
        isFinite(o.length) &&                   // o.length��������ֵ
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&    // o.length������
        o.length < 4294967296)
        return true;
    else
        return false;
}