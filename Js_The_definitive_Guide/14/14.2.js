/**
 * Created by 你的特仑苏 on 2015/5/21.
 * 提取URL的搜索字符串中的参数
 *  P344
 */

//  解析URL的查询串中的name=value参数对，并将其存储至对象属性中
var args = urlArgs();
var q = args.q || "";
var n = args.n ? parseInt(args.n) : 10;
function urlArgs() {
    var args = {};
    var query = location.search.substring(1);     //  去除"?"
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}
