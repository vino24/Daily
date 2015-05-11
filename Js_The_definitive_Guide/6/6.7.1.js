/**
 * Created by ��������� on 2015/5/11.
 * �������Ե�����
 * P137
 */
/*
* ��Object.prototype���һ������ö�ٵ�extend()����
*/
Object.defineProperty(Object.prototype,"extend",
    {
        writable:true,
        enumerable:false,
        configurable:true,
        value:function(o){
        //    �õ����е��������ԣ���������ö�ٵ�
            var names=Object.getOwnPropertyNames(o);
            for(var i=0;i<names.length;i++) {
            //    ��������Ѿ����ڣ�����
                if(names[i] in this) continue;
                var desc=Object.getOwnPropertyDescriptor(o,names[i]);
                Object.defineProperty(this,names[i],desc);
            }
        }
    });