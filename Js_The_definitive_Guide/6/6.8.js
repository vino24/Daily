/**
 * Created by 你的特仑苏 on 2015/5/11.
 * 返回传递的任意对象的类
 * P139
 */
function classof(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}
