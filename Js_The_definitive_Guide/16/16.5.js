/**
 * Created by ��������� on 2015/7/6.
 * classList():��className����һ��CSS�༯��
 * �����classList���Ծͷ��أ����򷵻�һ��ģ��DOMTokenList API�Ķ���
 */
function classList(e) {
    return e.classList || new CSSClassList(e);
}

// CSSClassList��һ��ģ��DOMTokenList��JavaScript��
function CSSClassList(e) {
    this.e = e;
}

// ģ��contains()
CSSClassList.prototype.contains = function (c) {
    if (c.length === 0 || c.indexOf(" ") != -1)
        throw new Error("Invalid");

    var classes = this.e.className;
    if (!classes) return false;
    if (classes === c) return true;
    return classes.search("\\b" + c + "\\b") != -1;
};

// ģ��add()
CSSClassList.prototype.add = function (c) {
    if (this.contains(c)) return;
    var classes = this.e.className;
    if (classes && classes[classes.length - 1] != " ")
        c = " " + c;    // �����Ҫ���һ���ո�
    this.e.className += c;
};

// ģ��remove()
CSSClassList.prototype.remove = function (c) {
    if (c.length === 0 || c.indexOf(" ") != -1)
        throw new Error(Invalid);
    var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
    this.e.className = this.e.className.replace(pattern, "");
};

//ģ��toggle()
CSSClassList.prototype.toggle = function (c) {
    if (this.contains(c)) {
        this.remove(c);
        return false;
    }
    else {
        this.add(c);
        return true;
    }
};

// ����e.className����
CSSClassList.prototype.toString = function () {
    return this.e.className;
};

// ����e.className�е�����
CSSClassList.prototype.toArray = function () {
    return this.e.className.match(/\b\w+\b/g) || [];
};

// ��������
var s=document.createElement("div");
s.innerHTML="hello world";
s.className="s1 s2 s3";
var h=CSSClassList(s);

