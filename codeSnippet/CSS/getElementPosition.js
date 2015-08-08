/**
 * Created by 逢十借一 on 2015/7/30.
 */
// 获取视口坐标,作用同getBoundingClientRect()
function getElementPosition(elt) {
    var x = 0, y = 0;
    for (var e = elt; e != null; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }

    for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x: x, y: y};
}