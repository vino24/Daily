/**
 * Created by ��������� on 2015/5/27.
 * CSS����
 *      P429
 */
function shake(e, oncomplete, distance, time) {
    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    if (!distance) distance = 5;

    var originalStyle = e.style.cssText;  //  ����e��ԭʼstyle
    e.style.position = "relative";
    var start = (new Date()).getTime();   //  ������ʼʱ��
    animate();
    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        var fraction = elapsed / time;
        if (fraction < 1) {
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";
            setTimeout(animate, Math.min(25, time - elapsed));
        }
        else {
            e.style.cssText = originalStyle;
            if (oncomplete) oncomplete(e);
        }
    }
}


