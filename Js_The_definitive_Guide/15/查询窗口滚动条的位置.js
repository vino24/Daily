/**
 * Created by 你的特仑苏 on 2015/5/25.
 *  P390
 */
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
