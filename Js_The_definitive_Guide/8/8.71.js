/**
 * Created by ��������� on 2015/5/16.
 * ���ʵ�κ��βθ����Ƿ����
 *  P188
 */
function check(args) {
    var actual=args.length;             //  ʵ�θ���
    var expected=args.callee.length;    //  �βθ���(����ʵ�θ���)
    if(actual!=expected)
    throw Error("Error");
}

function f(x,y,z) {
    check(arguments);   //  ���ʵ�θ��������������Ƿ�һ��
    //  ������
}
