/**
 * Created by 你的特仑苏 on 2015/7/28.
 * P603
 */
var editor, statusline, savebtn, idletimer;

window.onload = function () {
    if (localStorage.note == null) localStorage.note = "";
    if (localStorage.lastModified == null) localStorage.lastModified = 0;
    if (localStorage.lastSaved == null) localStorage.lastSaved = 0;

    editor = document.getElementById("editor");
    statusline = document.getElementById("statusline");
    savebtn = document.getElementById("savebtn");

    editor.value = localStorage.note;
    editor.disabled = true;   //  同步前禁止编辑

    editor.addEventListener("input", function (e) {
        //    将新的值保存到localStorage中
        localStorage.note = editor.value;
        localStorage.lastModified = Date.now();

        //    重置闲置计时器
        if (idletimer) clearTimeout(idletimer);
        idletimer = setTimeout(save, 5000);
        //  启动保存按钮
        savebtn.disabled = false;
    }, false);

//    每次载入应用程序时，尝试同步服务器
    sync();
};

//  离开页面前保存数据到服务器
window.onbeforeunload = function () {
    if (localStorage.lastModified > localStorage.lastSaved)
        save();
};

//  离线时，通知用户
window.onoffline = function () {
    status("Offline");
};

//  再次返回在线状态时，进行同步
window.ononline = function () {
    sync();
};

//  当有新版本应用的时候，提醒用户
window.applicationCache.onupdateready = function () {
    status("A new Version ia available.");
};

window.applicationCache.onnoupdate = function () {
    status("lastet");
};

//  用于在状态栏中显示状态信息的一个函数
function status(msg) {
    statusline.innerHTML = msg;
};

//  每当笔记内容更新后，如果用户停止编辑超过5秒
//  就自动将笔记文本上传到服务器
function save() {
    if (idletimer) clearTimeout(idletimer);
    idletimer = null;
    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/note");
        xhr.send(editor.value);
        xhr.onload = function () {
            localStorage.lastModified = Date.now();
            savebtn.disabled = true;
        };
    }
}

//  检查服务端是否有新版本的笔记
//  如果没有就将当前版本保存到服务器
function sync() {
    if (navigator.onLine) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/note");
        xhr.send();
        xhr.onload = function () {
            var remoteModTime = 0;
            if (xhr.status == 200) {
                var remoteModTime = xhr.getResponseHeader("Last-Modified");
                remoteModTime = new Date(remoteModTime).getTime();
            }

            if (remoteModTime > localStorage.lastModified) {
                status("New version found");
                var useit = confirm("Use It?");
                var now = Date.now();
                if (useit) {
                    editor.value = localStorage.note = xhr.responseText;
                    localStorage.lastSaved = now;
                    status("Newest version downloaded");
                } else
                    status(Ignoring);
                localStorage.lastModified = now;
            } else
                status("You editor is the newest!");

            if (localStorage.lastModified > localStorage.lastSaved) {
                save();
            }
            editor.disabled = false;
            editor.focus();
        }
    }
    else {  //  离线状态下，不能同步
        status("Can't sync while offline");
        editor.disabled = false;
        editor.focus();
    }
}
