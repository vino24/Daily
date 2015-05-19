/**
 * Created by ��������� on 2015/5/19.
 * �������õķ���ʵ��
 *  P227
 */
var generic = {
    //  ����һ���ַ������ַ����������캯��������
    //  �Լ����зǼ̳����ģ��Ǻ������Ե����ֺ�ֵ
    toString: function () {
        var s = '[';
        if (this.constructor && this.constructor.name)
            s += this.constructor.name + ":";

        //  ö�����зǼ̳�����
        var n = 0;  //  ���õ�һ������ǰ��û��","
        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue;   //  �����̳�����
            var value = this[name];
            if (typeof value === "function") continue;  //  ��������
            if (n++) s += ",";
            s += name + "=" + value;
        }
        return s + ']';
    },
    equals: function (that) {
        if(that==null || this.constructor!==that.constructor) return false;
        for(var name in this)
        {
            if(name==="|**objected**|") continue;       // ������������
            if(!this.hasOwnProperty(name)) continue;
            if(this[name]!==that[name]) return false;
        }
        return true;
    }
};
