/**
 * Created by 你的特仑苏 on 2015/5/10.
 */
var o = {};
Object.defineProperty(o, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});

//属性是存在的，但不可枚举
o.x;    //  1
Object.keys(o); // []

//对属性x做修改，让其可读
Object.defineProperty(o, "x", {writable: false});

//试图更改这个属性的值
o.x = 2;  //操作失败但不报错，而在严格模式中抛出类型错误异常
o.x     // 1

//  此时属性依然是可配置的，因此可以通过这种方式对它进行修改
Object.defineProperty(o, "x", {value: 2});
o.x     // 2

// 将x从数据属性改为存储器属性
Object.defineProperty(o, "x", {
    get: function () {
        return o;

    }
});

// Object.defineProperties() 同时创建或设置多个属性
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