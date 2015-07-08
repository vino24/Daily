/**
 * Created by ��������� on 2015/7/8.
 *      P475
 *      �����û�����
 *  ����������
 *  <input id="zip" type="text" data-allowed-chars="0123456789" data-messageid="zipwarn">
 *      <span id="zipwarn" style="color:red;visibility:hidden">ֻ֧������</span>
 */
window.addEventListener("load", function () {
    var inputtels = document.getElementsByTagName("input");
    for (var i = 0; i < inputtels.length; i++) {
        var elt = inputtels[i];
        //    ���������ı����û��data-allowed-chars���Ե�Ԫ��
        if (elt.type != "text" || !elt.hasAttribute("data-allowed-chars")) {
            continue;
        }

        if (elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false); //Chrome/Safari
            elt.addEventListener("tetinput", filter, false);  // DOM3
        } else {
            //  ��֧��addEventListener()��IEҲ����֧��textinput
            elt.attachEvent("onkeypress", filter);
        }
    }
    //  �����û�������¼��������
    function filter(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var text = null;  // ������ı�

        //    ��ȡ������ַ����ı�
        if (e.type === "textinput" || e.type === "textInput") text = e.data;
        else {  //  ��ͳ��keypress�¼�
            //  ���ڿɴ�ӡ����keypress�¼���Firefoxʹ��charCode
            var code = e.charCode || e.keyCode;

            if (code < 32 ||
                e.charCode == 0 ||
                e.ctrlKey || e.altKey)
                return;
            var text = String.fromCharCode(code);
        }

        //    ��inputԪ����Ѱ��������Ϣ
        var allowed = target.getAttribute("data-allowed-chars");
        var messageid = target.getAttribute("data-messageid");
        if (messageid) {
            var messageElement = document.getElementById(messageid);

            //    ���������ı��е��ַ�
            for (var i = 0; i < text.length; i++) {
                var c = text.charAt(i);
                if (allowed.indexOf(c) == -1) {    //  �Ƿ�Ϊ�����ַ�?
                    if (messageElement) messageElement.style.visibility = "visible";

                    //    ȡ��Ĭ����Ϊ
                    if (e.preventDefault) e.preventDefault();
                    if (e.returnValue) e.returnValue = false;
                    return false;
                }
            }
            //  ��������ַ����Ϸ�
            if (messageElement) messageElement.style.visibility = "hidden";
        }
    }
}, false);

