/**
 * Created by 你的特仑苏 on 2015/7/6.
 * classList():将className当做一个CSS类集合
 * 如果有classList属性就返回，否则返回一个模拟DOMTokenList API的对象
 */
function classList(e) {
    return e.classList || new CSSClassList(e);
}

// CSSClassList是一个模拟DOMTokenList的JavaScript类
function CSSClassList(e) {
    this.e = e;
}

// 模拟contains()
CSSClassList.prototype.contains = function (c) {
    if (c.length === 0 || c.indexOf(" ") != -1)
        throw new Error("Invalid");

    var classes = this.e.className;
    if (!classes) return false;
    if (classes === c) return true;
    return classes.search("\\b" + c + "\\b") != -1;
};

// 模拟add()
CSSClassList.prototype.add = function (c) {
    if (this.contains(c)) return;
    var classes = this.e.className;
    if (classes && classes[classes.length - 1] != " ")
        c = " " + c;    // 如果需要添加一个空格
    this.e.className += c;
};

// 模拟remove()
CSSClassList.prototype.remove = function (c) {
    if (c.length === 0 || c.indexOf(" ") != -1)
        throw new Error(Invalid);
    var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
    this.e.className = this.e.className.replace(pattern, "");
};

//模拟toggle()
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

// 返回e.className本身
CSSClassList.prototype.toString = function () {
    return this.e.className;
};

// 返回e.className中的类名
CSSClassList.prototype.toArray = function () {
    return this.e.className.match(/\b\w+\b/g) || [];
};

// 测试用例
var s=document.createElement("div");
s.innerHTML="hello world";
s.className="s1 s2 s3";
var h=CSSClassList(s);

