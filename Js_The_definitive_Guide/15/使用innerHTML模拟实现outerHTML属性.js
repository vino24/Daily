/**
 * Created by 你的特仑苏 on 2015/5/24.
 *  P385
 */
//  为不支持outerHTML属性的浏览器实现outerHTML属性

(function () {
    if (document.createElement("div").outerHTML) return;

    function outerHTMLGetter() {
        var container = document.createElement("div");    //  虚拟元素
        container.appendChild(this.cloneNode(true));    //  复制到虚拟节点
        return container.innerHTML;
    }

    function outerHTMLSetter(value) {
        //  创建虚拟元素
        var container = document.createElement("div");
        container.innerHTML = value;

        //  将虚拟元素中的节点全部移动到文档中
        while (container.firstChild)
            this.parentNode.insertBefore(container.firstChild, this);
        //  删除所被取代的节点
        this.parentNode.removeChild(this);
    }

    //  ES5
    if (Object.defineProperty) {
        Object.defineProperty(Element.prototype, "outerHTML", {
            get: outerHTMLGetter, set: outerHTMLSetter,
            enumerable: false, configurable: true
        });
    }
    //  ES3
    else {
        Element.prototype.__defineGetter__("outerHTML", outerHTMLGetter);
        Element.prototype.__defineSetter__("outerHTML", outerHTMLSetter);
    }
}());
