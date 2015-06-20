/**
 * Created by ÄãµÄÌØÂØËÕ on 2015/6/15.
 */
function strReverse(str) {
    return typeof str === "string" ? str.split("").reverse().join("") : "string allowed only!";
}
strReverse("hello");
