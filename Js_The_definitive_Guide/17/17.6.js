/**
 * Created by ��������� on 2015/7/7.
 *  P466
 *  �����������¼�
 */
//  ������װ�뵽һ��ָ����С�Ĵ�����ӿ���
//  ��ѡ����contentX��contentYָ����������ڴ���ĳ�ʼƫ����
function enclose(content,framewidth,frameheight,contentX,contentY) {
    framewidth=Math.max(framewidth,50);
    frameheight=Math.max(frameheight,50);
    contentX=Math.min(contentX,0)||0;
    contentY=Math.min(contentY,0)||0;

//    ����frameԪ��
    var frame=document.createElement("div");
    frame.className="enclosure";
    frame.style.width=framewidth+"px";
    frame.style.height=frameheight+"px";
    frame.style.overflow="hidden";  // û�й��������������
    frame.style.boxSizing="border-box";
    frame.style.webkitBoxSizing="border-box";
    frame.style.mozBoxSizing="border-box";

    content.parentNode.insertBefore(frame,content);
    frame.appendChild(content);

//    ȷ��Ԫ�������frame��λ��
    content.style.position="relative";
    content.style.left=contentX+"px";
    content.style.top=contentY+"px";

//    ����ض����������
    var isMacWebkit=(navigator.userAgent.indexOf("Macintosh")!==-1&&
                    navigator.userAgent.indexOf("Webkit")!==-1);
    var isFirefox=(navigator.userAgent.indexOf("Gecko")!==-1);

    // ע��mousewheel�¼��������
    frame.onwheel=wheelHandler; //  δ�������
    frame.onmousewheel=wheelHandler;    //  �ִ������
    if(isFirefox)   // Firefox
        frame.addEventListener("DOMMouseScroll",wheelHandler,false);

    function wheelHandler(event) {
        var e=event || window.event;

        var deltaX=e.deltaX*-30 ||  // wheel�¼�
                e.wheelDeltaX/4 ||  // mousewheel
                0;                  // ����δ����
    }
}
