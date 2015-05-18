/**
 * Created by 你的特仑苏 on 2015/5/16.
 * 模拟bind()方法（将函数绑定至某个对象，方法返回新的函数，调用新的函数将会把原始的函数当做对象的方法调用）
 *  P190
 */

// ES5
function f(y) {
    return this.x + y;
}    //  待绑定的函数
var o = {x: 1};                        //  将要绑定的对象
var g = f.bind(o);                   //  通过调用g(x)来调用o.f(x)
console.log(g(2));  //  3

//  模拟bind()函数
function bind(f, o) {
    if (f.bind)
        return f.bind(o);
    else return function () {
        return f.apply(o, arguments);
    };
}

// ES3版本的Function.bind()方法

if (!Function.prototype.bind) {
    Function.prototype.bind = function (o  /*,args*/) {
        //  将this和arguments的值保存至变量中
        //  以便在后面的嵌套函数中使用它们
        var self = this, bondArgs = arguments;

        //  bind()方法的返回值是一个函数
        return function () {
            //  创建一个实参列表，将传入bind的第二个及后续的实参都传入这个函数
            var args = [], i;
            for (i = 1; i < bondArgs.length; i++) args.push(bondArgs[i]);  //  bind()方法的实参
            for (i = 0; i < arguments.length; i++) args.push(arguments[i]);//  函数自身的实参
            //  将self作为o的方法调用，传入实参
            return self.apply(o, args);
        }
    }
}
