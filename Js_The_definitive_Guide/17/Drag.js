/**
 * Created by 你的特仑苏 on 2015/7/6.
 *      P462
 *      拖动文档元素
 *   定义一个drag()函数，用于mousedown事件处理程序的调用
 *   随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
 *
 * 参数：
 *      elementToDrag：接收mousedown事件的元素或某些包含元素
 *      event：mousedown事件对象
 */
function drag(elementToDrag, event) {
    //  初始鼠标位置，转化为文档坐标
    var scroll=getScrollOffsets();
    var startX=event.clientX+scroll.x;
    var startY=event.clientY+scroll.y;

    //  在文档坐标下，待拖动元素的初始位置
    //  elementToDrag是绝对定位，所以可以假设它的offsetParent就是文档的body
    var origX=elementToDrag.offsetLeft;
    var origY=elementToDrag.offsetTop;

//     计算mousedown事件和元素左上角之间的距离
    var deltaX=startX-origX;
    var deltaY=startY-origY;

//    注册用于响应接着mousedown事件发生的mousemove和mouseup事件的事件处理程序
    if(document.addEventListener) {
        document.addEventListener("mousemove",moveHandler,true);
        document.addEventListener("mouseup",upHandler,true);
    }
    else if(document.attachEvent) {
        //  IE事件模型中，
        //  捕获事件是通过调用元素上的setCapture()捕获它们
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove",moveHandler);
        elementToDrag.attachEvent("onmouseup",upHandler);
        //    作为mouseup事件看待鼠标捕获的丢失
        elementToDrag.attachEvent("onlosecapture",upHandler);
    }

//    stopPropagation()阻止事件继续传播
    if(event.stopPropagation) event.stopPropagation();  // 标准模型
    else event.cancelBubble=true;   // IE

//    阻止任何默认操作
    if(event.preventDefault) event.preventDefault();    //  标准模型
    else event.returnValue=false;   // IE

/*
    当元素正在被拖动时，捕获mousedown事件处理程序
    它用于移动这个元素
 */
    function moveHandler(e) {
        if(!e) e=window.event;  // IE事件模型

    //    移动这个元素到当前鼠标位置，
    //    通过滚动条的位置和初始单击的偏移量来调整
        var scroll=getScrollOffsets();
        elementToDrag.style.left=(e.clientX+scroll.x-deltaX)+"px";
        elementToDrag.style.top=(e.clientY+scroll.y-deltaY)+"px";
        if(e.stopPropagation) e.stopPropagation();
        else e.cancelBubble=true;
    }
    /*
     捕获在拖动结束时发生的最终mouseup事件的处理程序
     */
    function upHandler(e) {
        if(!e) e=window.event;

    //    注销捕获事件处理程序
        if(document.removeEventListener) {  //  DOM事件模型
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

//  以一个对象的x和y属性的方式返回滚动条的偏移量
function getScrollOffsets(w) {
    w = w || window;

    //  除<IE8以外
    if (w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};

    //  标准模式下的IE（或任何浏览器）
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

    //  怪异模式下的浏览器
    return {x: d.body.scrollLeft, y: d.body.scrollTop};
}

/*
    测试用例：
 <div style="position: absolute; left: 100px;top: 100px;width: 250px;background-color: white;border-bottom:solid black">
 <div style="background-color: gray;border-bottom: dotted black;padding: 3px;font-family: sans-serif;font-weight: bold;" onmousedown="drag(this.parentNode,event);">
 Drag Me!
 </div>
 <p>A test</p>
 </div>
 */

