/**
 * Created by ��������� on 2015/5/21.
 * ��ȡURL�������ַ����еĲ���
 *  P344
 */

//  ����URL�Ĳ�ѯ���е�name=value�����ԣ�������洢������������
var args = urlArgs();
var q = args.q || "";
var n = args.n ? parseInt(args.n) : 10;
function urlArgs() {
    var args = {};
    var query = location.search.substring(1);     //  ȥ��"?"
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
