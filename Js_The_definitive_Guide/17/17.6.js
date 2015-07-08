/**
 * Created by 你的特仑苏 on 2015/7/7.
 *  P466
 *  处理鼠标滚轮事件
 */
//  把内容装入到一个指定大小的窗体或视口中
//  可选参数contentX和contentY指定内容相对于窗体的初始偏移量
function enclose(content,framewidth,frameheight,contentX,contentY) {
    framewidth=Math.max(framewidth,50);
    frameheight=Math.max(frameheight,50);
    contentX=Math.min(contentX,0)||0;
    contentY=Math.min(contentY,0)||0;

//    创建frame元素
    var frame=document.createElement("div");
    frame.className="enclosure";
    frame.style.width=framewidth+"px";
    frame.style.height=frameheight+"px";
    frame.style.overflow="hidden";  // 没有滚动条，不能溢出
    frame.style.boxSizing="border-box";
    frame.style.webkitBoxSizing="border-box";
    frame.style.mozBoxSizing="border-box";

    content.parentNode.insertBefore(frame,content);
    frame.appendChild(content);

//    确定元素相对于frame的位置
    content.style.position="relative";
    content.style.left=contentX+"px";
    content.style.top=contentY+"px";

//    针对特定浏览器处理
    var isMacWebkit=(navigator.userAgent.indexOf("Macintosh")!==-1&&
                    navigator.userAgent.indexOf("Webkit")!==-1);
    var isFirefox=(navigator.userAgent.indexOf("Gecko")!==-1);

    // 注册mousewheel事件处理程序
    frame.onwheel=wheelHandler; //  未来浏览器
    frame.onmousewheel=wheelHandler;    //  现代浏览器
    if(isFirefox)   // Firefox
        frame.addEventListener("DOMMouseScroll",wheelHandler,false);

    function wheelHandler(event) {
        var e=event || window.event;

        var deltaX=e.deltaX*-30 ||  // wheel事件
                e.wheelDeltaX/4 ||  // mousewheel
                0;                  // 属性未定义
    }
}
