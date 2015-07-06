/**
 * Created by ��������� on 2015/7/6.
 *      P462
 *      �϶��ĵ�Ԫ��
 *   ����һ��drag()����������mousedown�¼��������ĵ���
 *   ����mousemove�¼����ƶ�ָ��Ԫ�أ�mouseup�¼�����ֹ�϶�
 *
 * ������
 *      elementToDrag������mousedown�¼���Ԫ�ػ�ĳЩ����Ԫ��
 *      event��mousedown�¼�����
 */
function drag(elementToDrag, event) {
    //  ��ʼ���λ�ã�ת��Ϊ�ĵ�����
    var scroll=getScrollOffsets();
    var startX=event.clientX+scroll.x;
    var startY=event.clientY+scroll.y;

    //  ���ĵ������£����϶�Ԫ�صĳ�ʼλ��
    //  elementToDrag�Ǿ��Զ�λ�����Կ��Լ�������offsetParent�����ĵ���body
    var origX=elementToDrag.offsetLeft;
    var origY=elementToDrag.offsetTop;

//     ����mousedown�¼���Ԫ�����Ͻ�֮��ľ���
    var deltaX=startX-origX;
    var deltaY=startY-origY;

//    ע��������Ӧ����mousedown�¼�������mousemove��mouseup�¼����¼��������
    if(document.addEventListener) {
        document.addEventListener("mousemove",moveHandler,true);
        document.addEventListener("mouseup",upHandler,true);
    }
    else if(document.attachEvent) {
        //  IE�¼�ģ���У�
        //  �����¼���ͨ������Ԫ���ϵ�setCapture()��������
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove",moveHandler);
        elementToDrag.attachEvent("onmouseup",upHandler);
        //    ��Ϊmouseup�¼�������겶��Ķ�ʧ
        elementToDrag.attachEvent("onlosecapture",upHandler);
    }

//    stopPropagation()��ֹ�¼���������
    if(event.stopPropagation) event.stopPropagation();  // ��׼ģ��
    else event.cancelBubble=true;   // IE

//    ��ֹ�κ�Ĭ�ϲ���
    if(event.preventDefault) event.preventDefault();    //  ��׼ģ��
    else event.returnValue=false;   // IE

/*
    ��Ԫ�����ڱ��϶�ʱ������mousedown�¼��������
    �������ƶ����Ԫ��
 */
    function moveHandler(e) {
        if(!e) e=window.event;  // IE�¼�ģ��

    //    �ƶ����Ԫ�ص���ǰ���λ�ã�
    //    ͨ����������λ�úͳ�ʼ������ƫ����������
        var scroll=getScrollOffsets();
        elementToDrag.style.left=(e.clientX+scroll.x-deltaX)+"px";
        elementToDrag.style.top=(e.clientY+scroll.y-deltaY)+"px";
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble=true;
    }
    /*
     �������϶�����ʱ����������mouseup�¼��Ĵ������
     */
    function upHandler(e) {
        if(!e) e=window.event;

    //    ע�������¼��������
        if(document.removeEventListener) {  //  DOM�¼�ģ��
            elementToDrag.removeEventListener("mouseup",upHandler,true);
            elementToDrag.removeEventListener("mousemove",moveHandler,true);
        }
        else if(document.detachEvent) {
            elementToDrag.detachEvent("onlosecapture",upHandler);
            elementToDrag.detachEvent("onmouseup",upHandler);
            elementToDrag.detachEvent("onmousemove",moveHandler);
            elementToDrag.releaseCapture();
        }

        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble=true;
    }
}

//  ��һ�������x��y���Եķ�ʽ���ع�������ƫ����
function getScrollOffsets(w) {
    w = w || window;

    //  ��<IE8����
    if (w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};

    //  ��׼ģʽ�µ�IE�����κ��������
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

    //  ����ģʽ�µ������
    return {x: d.body.scrollLeft, y: d.body.scrollTop};
}

/*
    ����������
 <div style="position: absolute; left: 100px;top: 100px;width: 250px;background-color: white;border-bottom:solid black">
 <div style="background-color: gray;border-bottom: dotted black;padding: 3px;font-family: sans-serif;font-weight: bold;" onmousedown="drag(this.parentNode,event);">
 Drag Me!
 </div>
 <p>A test</p>
 </div>
 */

