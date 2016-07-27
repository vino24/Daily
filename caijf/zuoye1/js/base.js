var base = (function () {
    /**
     * 消除浏览器兼容
     * include function:Array.filter,Array.indexOf,Array.forEach,window.XMLHttpRequest
     */
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /*, thisArg */) {
            if (this === undefined || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length;
            if (typeof fun !== "function")
                throw new TypeError();
            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : undefined;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (fun.call(thisArg, val, i, t))
                        res.push(val);
                }
            }
            return res;
        };
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!Array.prototype.forEach) {
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
    }
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }
    if (!window.XMLHttpRequest) {
        window.XMLHttpRequest = function () {
            try {
                //  ActiveX对象新版本
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (e1) {
                try {
                    //  ActiveX对象旧版本
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                } catch (e2) {
                    throw new TypeError("XMLHttpRequest is not supported");
                }
            }
        };
    }
    return {
        /**
         * 封装getElementById
         * @param  {id} Id选择器
         */
        getById: function (id) {
            return document.getElementById(id);
        },

        /*
         *   封装兼容IE的getElementsByClassName
         *   @param {className} 类名, {parent} 父节点
         * */
        getByClass: function (className, parent) {
            //  IE8+及其他高级浏览器
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className);
            }
            //  IE8及以下 遍历document文档指定的父节点下所有子节点
            var children = parent.getElementsByTagName("*");
            var result = [];
            for (var i = 0, l = children.length; i < l; i++) {
                var child = children[i];
                if (base.hasClass(child, className)) {
                    result.push(child);
                }
            }
            return result;
        },

        //  检测class
        hasClass: function (element, ClassName) {
            var name = element.className.split(" ");
            return name.indexOf(ClassName) !== -1;
        },

        // 添加class
        addClass: function (element, newClassName) {
            if (!base.hasClass(element, newClassName)) {
                if (element.className) {
                    element.className += " " + newClassName;
                } else {
                    element.className += newClassName;
                }
            }
        },

        // 移除class
        removeClass: function (element, oldClassName) {
            if (base.hasClass(element, oldClassName)) {
                element.className = element.className.replace(oldClassName, "").trim().split(/\s+/).join(" "); //  去除多余的空格
            }
        },


        /**
         * 时间格式化
         * @param  {time} 待格式化时间
         * @return {ymd}  YYYY-MM-DD {hms} HH:MM:SS
         */
        timeFormat: function (time) {
            function format(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            return {
                ymd: function () {
                    return [time.getFullYear(), format(time.getMonth() + 1), format(time.getDate())].join("-");
                },
                hms: function () {
                    return [format(time.getHours()), format(time.getMinutes()), format(time.getSeconds())].join(":");
                }
            };
        },

        /*  事件绑定
         *   @param {target} 要绑定元素, {type} 事件类型, {handler} 事件处理函数
         * */
        bindEvent: function (target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler);
            } else if (target.attachEvent) {
                target.attachEvent('on' + type, handler); // IE
            } else {
                target["on" + type] = handler;
            }
        },
        //  防注入
        escapeHtml: function (str) {
            return str.replace(/[\&<>]/g, function(s) {
                switch(s) {
                    case "&": return "&amp;";
                    case "<": return "&lt;";
                    case ">": return "&gt;";
                    default: return s;
                }
            });
        },
        //  解析JSON数据
        parseJSON: function (data) {
            if (window.JSON) return JSON.parse(data);
            else return eval(data);
        },
        stringify: function (obj) {
            if (window.JSON) {
                return JSON.stringify(obj);
            }
            var t = typeof (obj);
            if (t != "object" || obj === null) {
                // simple data type
                if (t == "string") obj = '"' + obj + '"';
                return String(obj);
            } else {
                // recurse array or object
                var n, v, json = [], arr = (obj && obj.constructor == Array);

                // fix.
                var self = arguments.callee;

                for (n in obj) {
                    v = obj[n];
                    t = typeof(v);
                    if (obj.hasOwnProperty(n)) {
                        if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null)
                            v = self(v);
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        },
        getEventTarget: function (e) {
            return e.target || e.srcElement;
        },

        /**
         * 按数据某属性排序
         * @param {data} 要排序的数据 {prop} 排序属性
         */
        sort: function (data,prop) {
            data.sort(function (a, b) {
                return parseInt(b[prop]) - parseInt(a[prop]);
            });
        },

        /*
         *   处理XHR操作
         *   @param {url} 请求的URL, {method} 请求方法, {callback} 回调函数， {data} 要发送的数据
         * */
        sendXHR: function (url,callback) {
            var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) { //  无法将readystate和status放一起作为判定条件，因为readyState状态在请求过程中会变，这样无法添加处理异常的代码
                        if (xhr.status === 200 || xhr.status === 304) callback(xhr.responseText);
                        else console.log("Request was unsuccessful:" + xhr.status);
                    }
                };
            if (arguments.length==3) {
                xhr.open("POST", url, true);
                xhr.send(base.stringify(arguments[2]));
            }
             else {
                xhr.open("GET",url,true);
                xhr.send();
            }
        }
    };
}());
