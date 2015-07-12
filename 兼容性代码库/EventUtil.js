/**
 * Created by ��������� on 2015/7/7.
 * ����������¼��������
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {

            //  �˷���ע���¼����������ɾ������Ϊ��װ���� û�б�������
            element.attachEvent("on" + type, function (event) {
                //    �Ѵ��������Ϊʱ��Ŀ��ķ�������
                //    �����¼�����
                return handler.call(element, event);
            });

            /*  ������this����
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

//  ����
var btn = document.getElementById("myBtn");
var handler = function () {
    alert("Clicked");
};
EventUtil.addHandler(btn, "click", handler);
EventUtil.removeHandler(btn, "click", handler);
