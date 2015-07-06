/**
 * Created by 你的特仑苏 on 2015/7/6.
 *  P455
 *  解决attachEvent()注册的处理程序this值为全局window对象的方法
 */
function addEvent(target, type, handler) {
    if (target.addEventListener)
        target.addEventListener(type, handler, false);
    else
        target.attachEvent("on" + type,
            function (event) {
                //  把处理程序作为事件目标的方法调用，
                //  传递事件对象
                return handler.call(target, event);
            });
}
