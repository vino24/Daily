/**
 * Created by дЦ╣дльбьку on 2015/7/7.
 */
var btn = document.getElementById("s4");
btn.onclick = function (event) {
    alert("Clicked");
    event.stopPropagation();
};
document.body.onclick = function (event) {
    alert("Body!");
};
