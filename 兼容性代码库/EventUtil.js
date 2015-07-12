/**
 * Created by 你的特仑苏 on 2015/7/7.
 * 跨浏览器的事件处理程序
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {

            //  此方法注册事件处理程序不能删除，因为包装函数 没有保留下来
            element.attachEvent("on" + type, function (event) {
                //    把处理程序作为时间目标的方法调用
                //    传递事件对象
                return handler.call(element, event);
            });

            /*  不考虑this问题
             *   element.attachEvent("on"+type,handler);
             */
        } else {
            element["on" + type] = handler;
        }
    },

    getEvent: function (event) {
        return event || window.event;
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {
        if (event.preventDefault)
            event.preventDefault();
        else
            event.returnValue = false;
    },

    removeHandler: function (element, type, handler) {
        if (element.removeHandler) {
            element.removeHandler(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    stopPropagation: function (event) {
        if (event.stopPropagation)
            event.stopPropagation();
        else
            event.cancelBubble = true;
    },

    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },

    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return event.wheelDelta;
        } else {    // Firefox
            return -event.detail * 40;
        }
    },
};

//  测试
var btn = document.getElementById("myBtn");
var handler = function () {
    alert("Clicked");
};
EventUtil.addHandler(btn, "click", handler);
EventUtil.removeHandler(btn, "click", handler);
