var base = {
    /*
    *   处理浏览器兼容性方法
    * */

    //  检测是否为IE6
    isIE6: function(){
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE 6]><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    },
    /*
    * IE function rewrite
    *   include:filter、forEach、indexOf、XMLHttpRequest
    */
    ieFixed: function () {
        if (!!window.ActiveXObject) {   //  检测是否为IE浏览器
            Array.prototype.filter = function (fun /*, thisArg */) {
                "use strict";
                if (this === void 0 || this === null)
                    throw new TypeError();
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function")
                    throw new TypeError();
                var res = [];
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t) {
                        var val = t[i];
                        if (fun.call(thisArg, val, i, t))
                            res.push(val);
                    }
                }
                return res;
            };

            Array.prototype.forEach = function (fun /*, thisp*/) {
                var len = this.length;
                if (typeof fun != "function")
                    throw new TypeError();
                var thisp = arguments[1];
                for (var i = 0; i < len; i++) {
                    if (i in this)
                        fun.call(thisp, this[i], i, this);
                }
            };

            Array.prototype.indexOf = function (obj) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == obj) {
                        return i;
                    }
                }
                return -1;
            };

            window.XMLHttpRequest = function () {
                try {
                    //  ActiveX对象新版本
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }
                catch (e1) {
                    try {
                        //  ActiveX对象旧版本
                        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                    }
                    catch (e2) {
                        throw new TypeError("XMLHttpRequest is not supported");
                    }
                }
            };
        }
    },

    /*
     *   DOM操作方法
     * */

    //  封装getElementById
    $: function (id) {
        return document.getElementById(id);
    },

    /*
     *   封装兼容IE的getElementsByClassName
     *   @param {className} 类名, {tagName} 指定标签名
     * */
    getByClass: function (className, tagName) {
        //  IE8+及其他高级浏览器
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(className)[0];
        }
        tagName = tagName || "div";
        //  IE8及以下 遍历document文档指定的标签名集合
        var children = document.getElementsByTagName(tagName);
        //  保存遍历后得到的class元素
        var elements = new Array();

        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');   //分割多个class元素
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements[0];
    },

    //  检测class
    hasClass: function (element, ClassName) {
        var name = element.className.split(" ");
        if (name.indexOf(ClassName) !== -1)
            return true;
    },

    // 添加class
    addClass: function (element, newClassName) {
        if (!base.hasClass(element, newClassName))
            element.className += " " + newClassName;
    },

    // 移除class
    removeClass: function (element, oldClassName) {
        if (base.hasClass(element, oldClassName))
            element.className = element.className.replace(oldClassName, "");
    },

    /*
    *   功能函数
    * */
    //  时间格式化
    timeFormat: function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },

    /*  事件绑定
    *   @param {target} 要绑定元素, {type} 事件类型, {handler} 事件处理函数
    * */
    bindEvent: function (target, type, handler) {
        if (target.addEventListener) {
            target.addEventListener(type, handler);
        }
        else if (target.attachEvent) {
            target.attachEvent('on' + type, handler);     // IE
        } else {
            target["on" + type] = handler;
        }
    },
    //  防注入
    escapeHtml: function (str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
    },
    //  解析JSON数据
    parseJSON: function (data) {
        if (window.JSON) return JSON.parse(data);
        else return eval(data);
    },

    /*
     *   处理XHR操作
     *   @param {url} 请求的URL, {method} 请求方法, {callback} 回调函数
     * */
    sendXHR: function (url, method, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        if (callback) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr.responseText);
                }
            };
        }
        xhr.send();
    } /*  不能留"," IE8-报错 */
};
