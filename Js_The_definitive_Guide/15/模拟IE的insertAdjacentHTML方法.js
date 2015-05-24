/*
 P386
 */
// 本模块为不支持insertAdjacentHTML()的浏览器定义Element.insertAdjacentHTML
// 同时定义可移植的HTML插入函数：Insert.before() Insert.after() Insert.atStart() Insert.atEnd()

var Insert = (function () {
    //	如果元素有原生的insertAdjacentHTML
    //	在4个函数名更明的HTML插入函数中使用它
    if (document.createElement("div").insertAdjacentHTML) {
        return {
            before: function (e, h) {
                e.insertAdjacentHTML("beforebegin", h);
            },
            after: function (e, h) {
                e.insertAdjacentHTML("afterend", h);
            },
            atStart: function (e, h) {
                e.insertAdjacentHTML("afterbegin", h);
            },
            atEnd: function (e, h) {
                e.insertAdjacentHTML("beforeend", h);
            }
        };
    }

    //	定义一个工具函数，传入HTML字符串，返回一个DocumentFragment，
    //	包含了解析后的HTML的表示
    function fragment(html) {
        var elt = document.createElement("div");	//	创建空元素（将字符串转换为HTML）
        var frag = document.createDocumentFragment();
        elt.innerHTML = html;
        while (elt.firstChild)					//	移动所以节点
            frag.appendChild(elt.firstChild);		//	从elt到frag
        return frag;
    }

    var Insert = {
        before: function (elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt);
        },
        after: function (elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt.nextSibling);
        },
        atStart: function (elt, html) {
            elt.insertBefore(fragment(html), elt.firstChild);
        },
        atEnd: function (elt, html) {
            elt.appendChild(fragment(html));
        }
    };
    //  基于以上实现insertAdjacentHTML
    Element.prototype.insertAdjacentHTML = function (pos, html) {
        switch (pos.toLowerCase()) {
            case "beforebegin":
                return Insert.before(this, html);
            case "afterend":
                return Insert.after(this, html);
            case "afterbegin":
                return Insert.atStart(this, html);
            case "beforeend":
                return Insert.atEnd(this, html);
        }
    };
    return Insert;
}());