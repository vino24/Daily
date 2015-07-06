/**
 * Created by ��������� on 2015/5/27.
 * CSS����
 *      P429
 */
function shake(e, oncomplete, distance, time) {
    if (typeof e === "string") e = document.getElementById(e);
    time = time || 500;
    distance = distance || 5;

    var originalStyle = e.style.cssText;  //  ����e��ԭʼstyle
    e.style.position = "relative";
    var start = (new Date()).getTime();   //  ������ʼʱ��
    animate();
    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        var fraction = elapsed / time;
        if (fraction < 1) {     //  �������δ���
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";
            setTimeout(animate, Math.min(25, time - elapsed));
        }
        else {                  //  �������
            e.style.cssText = originalStyle;
            if (oncomplete) oncomplete(e);
        }
    }
}

function fadeOut(e, oncomplete, time) {
    if (typeof e === "String") e = document.getElementById(e);
    time = time || 500;
    var ease = Math.sqrt;
    var start = (new Date()).getTime();
    animate();
    function animate() {
        var elapsed = (new Date()).getTime() - start;
        var fraction = elapsed / time;
        if (fraction < 1) {
            var opacity = 1 - ease(fraction);
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            e.style.opacity = "0";
            if (oncomplete) oncomplete(e);
        }
    }
}


