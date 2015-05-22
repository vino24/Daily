/**
 * Created by 你的特仑苏 on 2015/5/21.
 *  定时器应用函数
 *      P342
 */
function invoke(f, start, interval, end) {
    if (!start) start = 0;
    if (arguments.length <= 2)
        setTimeout(f, start);
    else {
        setTimeout(repeat, start);
        function repeat() {
            var h = setInterval(f, interval);
            if (end) setTimeout(function () {
                clearInterval(h);
            }, end);
        }
    }
}
invoke(function () {
    console.log("hello");
}, 1000, 2000, 11000);
console.log(window.location);