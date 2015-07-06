/**
 * Created by ��������� on 2015/7/3.
 * ����ȫ����
 */
//  ʵ��һ�����ߺ�������������󣨶���ת��Ϊ����������
//  �ں����ʾ���������õ������������arguments����ת��Ϊ����������
function array(a, n) {
    return [].slice.call(a, n || 0);
}

// ���������ʵ�δ��������
function partialLeft(f /*,...*/) {
    var args = arguments; //  �����ⲿ���ǲ�����
    //console.log(args);
    return function () {
        var a = array(args, 1);   //   �����ⲿ��args
        //console.log(arguments);
        a = a.concat(array(arguments)); // �����ڲ�ʵ��
        return f.apply(this, a);
    };
}

// ���������ʵ�δ������Ҳ�
function particalRight(f /*,...*/) {
    var args = arguments;
    return function () {
        var a = array(arguments); //  ���ڲ�������ʼ
        a = a.concat(array(args, 1));
        return f.apply(this, a);
    };
}

//  ���������ʵ�α�����ģ��
//  ʵ���б��е�undefinedֵ�����
function partical(f /*,*/) {
    var args = arguments;
    return function () {
        var a = array(args, 1);
        var i = 0, j = 0;
        for (; i < a.length; i++)
            if (a[i] === undefined) a[i] = arguments[j++];
        a = a.concat(array(arguments, j));
        return f.apply(this, a);
    };
}
var f = function (x, y, z) {
    return x * (y - z);
};
console.log(partialLeft(f, 2)(3, 4));
console.log(particalRight(f, 2)(3, 4));
console.log(partical(f, undefined, 2)(3, 4));
