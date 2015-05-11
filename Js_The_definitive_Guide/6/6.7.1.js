/**
 * Created by 你的特仑苏 on 2015/5/11.
 * 复制属性的特性
 * P137
 */
/*
* 给Object.prototype添加一个不可枚举的extend()方法
*/
Object.defineProperty(Object.prototype,"extend",
    {
        writable:true,
        enumerable:false,
        configurable:true,
        value:function(o){
        //    得到所有的自有属性，包括不可枚举的
            var names=Object.getOwnPropertyNames(o);
            for(var i=0;i<names.length;i++) {
            //    如果属性已经存在，跳过
                if(names[i] in this) continue;
                var desc=Object.getOwnPropertyDescriptor(o,names[i]);
                Object.defineProperty(this,names[i],desc);
            }
        }
    });