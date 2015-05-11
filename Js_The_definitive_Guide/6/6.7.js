/**
 * Created by ��������� on 2015/5/10.
 */
var o = {};
Object.defineProperty(o, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});

//�����Ǵ��ڵģ�������ö��
o.x;    //  1
Object.keys(o); // []

//������x���޸ģ�����ɶ�
Object.defineProperty(o, "x", {writable: false});

//��ͼ����������Ե�ֵ
o.x = 2;  //����ʧ�ܵ������������ϸ�ģʽ���׳����ʹ����쳣
o.x     // 1

//  ��ʱ������Ȼ�ǿ����õģ���˿���ͨ�����ַ�ʽ���������޸�
Object.defineProperty(o, "x", {value: 2});
o.x     // 2

// ��x���������Ը�Ϊ�洢������
Object.defineProperty(o, "x", {
    get: function () {
        return o;

    }
});

// Object.defineProperties() ͬʱ���������ö������
var p=Object.defineProperties({},{
    x:{value:1,writable:true,enumerable:true,configurable:true},
    y:{value:1,writable:true,enumerable:true,configurable:true},
    r:{
        get: function () {
            return Math.sqrt(this.x*this.x+this.y*this.y);
        },
        enumerable:true,
        configurable:true
    }
});