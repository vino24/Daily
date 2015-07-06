/**
 * Created by 你的特仑苏 on 2015/6/6.
 *  P432
 */
// 查询计算样式与设置内敛样式
function scale(e, factor) {
    var size = parseInt(window.getComputedStyle(e, "").fontSize);
    e.style.fontSize = factor * size + "px";
}

//  factor > 1 颜色变浅；factor < 1 颜色变暗
function scaleColor(e, factor) {
    var color = window.getComputedStyle(e, null).backgroundColor;
    var components = color.match(/[\d\.]+/g); //  解析rgba分量
    for (var i = 0; i < 3; i++) {
        var x = Number(components[i] * factor);
        x = Math.round(Math.min(Math.max(x, 0), 255));
        components[i] = String(x);
    }
    if (components.length === 3) e.style.backgroundColor = "rgb(" + components.join() + ")";
    else e.style.backgroundColor = "rgba(" + components.join() + ")";
}
