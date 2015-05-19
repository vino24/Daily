/**
 * Created by 你的特仑苏 on 2015/5/19.
 * 方法借用的泛化实现
 *  P227
 */
var generic = {
    //  返回一个字符串，字符串包含构造函数的名字
    //  以及所有非继承来的，非函数属性的名字和值
    toString: function () {
        var s = '[';
        if (this.constructor && this.constructor.name)
            s += this.constructor.name + ":";

        //  枚举所有非继承属性
        var n = 0;  //  设置第一个属性前面没有","
        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue;   //  跳过继承属性
            var value = this[name];
            if (typeof value === "function") continue;  //  跳过方法
            if (n++) s += ",";
            s += name + "=" + value;
        }
        return s + ']';
    },
    equals: function (that) {
        if(that==null || this.constructor!==that.constructor) return false;
        for(var name in this)
        {
            if(name==="|**objected**|") continue;       // 跳过特殊属性
            if(!this.hasOwnProperty(name)) continue;
            if(this[name]!==that[name]) return false;
        }
        return true;
    }
};
