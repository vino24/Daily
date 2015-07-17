/**
 * Created by ��������� on 2015/7/15.
 *  CORS - ������Դ����
 *      P504
 *      linkdetails.js
 */

//  ʹ��HEAD��CORS����������ϸ��Ϣ

window.onload = function () {
    //  �Ƿ�֧�ֿ�������
    var supportCORS = (new XMLHttpRequest()).withCredentials !== undefined;

//    �����ĵ���������
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (!link.href) continue;
        if (link.title) continue;

        //    �������һ����������
        if (link.host !== location.host || link.protocol !== location.protocol) {
            link.title = "վ������";
            if (!supportCORS) continue;
        }

        //    ע���¼�������򣬵������ͣʱ����������ϸ��Ϣ
        if (link.addEventListener)
            link.addEventListener("mouseover", onmouseoverHandler, false);
        else
            link.attachEvent("onmouseover", onmouseoverHandler);
    }

    function onmouseoverHandler(e) {
        var link = e.target || e.srcElement;    // <a>Ԫ��
        var url = link.href;

        var req = new XMLHttpRequest();
        req.open("HEAD", url);   //  ����ѯ��ͷ��Ϣ
        req.onreadystatechange = function () {
            if (req.readyState !== 4) return;
            if (req.status === 200) {
                var type = req.getResponseHeader("Content-Type");
                var size = req.getResponseHeader("Content-Length");
                var date = req.getResponseHeader("Last-Modified");

                //    �ڹ�����ʾ����ʾ��ϸ��Ϣ
                link.title = "���ͣ�" + type + "\n" +
                    "��С��" + size + "\n" + "ʱ�䣺" + date;
            }
            else {
                if (!link.title)
                    link.title = "Couldn't fetch details:\n" +
                        req.status + " " + req.statusText;
            }
        };
        req.send(null);

        //  �Ƴ��������
        if (link.removeEventListener)
            link.removeEventListener("mouseover", onmouseoverHandler, false);
        else
            link.detachEvent("onmouseover", onmouseoverHandler);
    }
}
