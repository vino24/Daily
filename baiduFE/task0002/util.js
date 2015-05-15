/**
 * Created by ��������� on 2015/5/8.
 */
// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
function isArray(arr) {
    // your implement
    return Object.prototype.toString().call(arr)==="[object Array]";
}

// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
    // your implement
    return typeof fn==="js";
}

// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
function cloneObject(src) {
    //���� ���� �ַ��� ���� null undefined
    if (src == null || typeof src != "object")
        return src;
    //���� Date
    else if (src instanceof Date) {
        var clone;
        clone = new Date(src);
        return clone;
    }
    // ���� ����
    else if (src instanceof Array) {
        var clone = [];
        for (var i in src)
            clone[i] = src[i];
        return clone;
        // ���� Object
    } else if (src instanceof Object) {
        var clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key))    // ���Լ̳�����
                clone[key] = cloneObject(src[key]); //�ݹ�
                //  clone[key]=src[key]; ���һ�� ������������������������
        }
        return clone;
    }
}

// ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
// ����ʹ��һ�м���������ʽ��ɸ���Ŀ
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}

// ��ȡһ�����������һ��Ԫ�ص�����������һ������
function getObjectLength(obj) {
    var element = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            element++;
        }
    }
    return element;
}
