/**
 * Created by дЦ╣дльбьку on 2015/5/4.
 */
function moveon() {
    var ans=confirm("ready?");
    if(ans) window.location="http://www.baidu.com";
}
setTimeout(moveon,6000);


function debug(msg) {
    var log=document.getElementById("debuglog");
    if(!log) {
        log=document.createElement("div");
        log.id="debuglog";
        log.innerHTML="<h1>Debug Log</h1>";
        document.body.appendChild(log);
    }
    var pre=document.createElement("pre");
    var text=document.createTextNode(msg);
    pre.appendChild(text);
    log.appendChild(pre);
}


function hide(e,reflow) {
    if(reflow) {
        e.style.display="none";
    }
    else {
        e.style.visibility="hidden";
    }
}

