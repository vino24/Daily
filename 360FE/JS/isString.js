/**
 * Created by дЦ╣дльбьку on 2015/6/16.
 */
function isString(str) {
    // return Object.prototype.toString.call(str) === "[object String]";
    return Object.prototype.toString.call(str).slice(8,-1)==="String";
}
console.log(isString(23));