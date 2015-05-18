/**
 * Created by ��������� on 2015/5/16.
 * ģ��bind()����������������ĳ�����󣬷��������µĺ����������µĺ��������ԭʼ�ĺ�����������ķ������ã�
 *  P190
 */

// ES5
function f(y) {
    return this.x + y;
}    //  ���󶨵ĺ���
var o = {x: 1};                        //  ��Ҫ�󶨵Ķ���
var g = f.bind(o);                   //  ͨ������g(x)������o.f(x)
console.log(g(2));  //  3

//  ģ��bind()����
function bind(f, o) {
    if (f.bind)
        return f.bind(o);
    else return function () {
        return f.apply(o, arguments);
    };
}

// ES3�汾��Function.bind()����

if (!Function.prototype.bind) {
    Function.prototype.bind = function (o  /*,args*/) {
        //  ��this��arguments��ֵ������������
        //  �Ա��ں����Ƕ�׺�����ʹ������
        var self = this, bondArgs = arguments;

        //  bind()�����ķ���ֵ��һ������
        return function () {
            //  ����һ��ʵ���б�������bind�ĵڶ�����������ʵ�ζ������������
            var args = [], i;
            for (i = 1; i < bondArgs.length; i++) args.push(bondArgs[i]);  //  bind()������ʵ��
            for (i = 0; i < arguments.length; i++) args.push(arguments[i]);//  ���������ʵ��
            //  ��self��Ϊo�ķ������ã�����ʵ��
            return self.apply(o, args);
        }
    }
}
