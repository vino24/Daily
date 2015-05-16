/**
 * Created by ��������� on 2015/5/16.
 * ���ñհ�ʵ��˽�����Դ�ȡ������
 *  P186
 */
/*
 ����������o���������Դ洢������
 �ر�֮������getter setter����������������ֵ��û�д洢�ڶ���o��
 �ô���
 ����������ȡ��������˵���������˽�еģ�û�а취�ƹ���ȡ�����������û��޸����ֵ
 */
function addPrivateProperty(o, name, predicate) {
    var value;  //  ����ֵ
    o["get" + name] = function () {
        return value;
    };
    o["set" + name] = function (v) {
        if (predicate && !predicate(v))
            throw Error("set" + name + ":invalid value" + v);
        else
            value = v;
    };
}

var o = {};
//  ȷ��ֻ�����ַ���ֵ
addPrivateProperty(o, "Name", function (x) {
    return typeof x == "string";
});

o.setName("Frank");
console.log(o.getName());   // Frank

