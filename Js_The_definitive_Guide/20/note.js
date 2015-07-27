/**
 * Created by ��������� on 2015/7/28.
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
    editor.disabled = true;   //  ͬ��ǰ��ֹ�༭

    editor.addEventListener("input", function (e) {
        //    ���µ�ֵ���浽localStorage��
        localStorage.note = editor.value;
        localStorage.lastModified = Date.now();

        //    �������ü�ʱ��
        if (idletimer) clearTimeout(idletimer);
        idletimer = setTimeout(save, 5000);
        //  �������水ť
        savebtn.disabled = false;
    }, false);

//    ÿ������Ӧ�ó���ʱ������ͬ��������
    sync();
};

//  �뿪ҳ��ǰ�������ݵ�������
window.onbeforeunload = function () {
    if (localStorage.lastModified > localStorage.lastSaved)
        save();
};

//  ����ʱ��֪ͨ�û�
window.onoffline = function () {
    status("Offline");
};

//  �ٴη�������״̬ʱ������ͬ��
window.ononline = function () {
    sync();
};

//  �����°汾Ӧ�õ�ʱ�������û�
window.applicationCache.onupdateready = function () {
    status("A new Version ia available.");
};

window.applicationCache.onnoupdate = function () {
    status("lastet");
};

//  ������״̬������ʾ״̬��Ϣ��һ������
function status(msg) {
    statusline.innerHTML = msg;
};

//  ÿ���ʼ����ݸ��º�����û�ֹͣ�༭����5��
//  ���Զ����ʼ��ı��ϴ���������
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

//  ��������Ƿ����°汾�ıʼ�
//  ���û�оͽ���ǰ�汾���浽������
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
    else {  //  ����״̬�£�����ͬ��
        status("Can't sync while offline");
        editor.disabled = false;
        editor.focus();
    }
}
