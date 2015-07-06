/**
 * Created by ��������� on 2015/6/6.
 *  P432
 */
// ��ѯ������ʽ������������ʽ
function scale(e, factor) {
    var size = parseInt(window.getComputedStyle(e, "").fontSize);
    e.style.fontSize = factor * size + "px";
}

//  factor > 1 ��ɫ��ǳ��factor < 1 ��ɫ�䰵
function scaleColor(e, factor) {
    var color = window.getComputedStyle(e, null).backgroundColor;
    var components = color.match(/[\d\.]+/g); //  ����rgba����
    for (var i = 0; i < 3; i++) {
        var x = Number(components[i] * factor);
        x = Math.round(Math.min(Math.max(x, 0), 255));
        components[i] = String(x);
    }
    if (components.length === 3) e.style.backgroundColor = "rgb(" + components.join() + ")";
    else e.style.backgroundColor = "rgba(" + components.join() + ")";
}
