window.onload = function () {
    var container = document.getElementById("container");
    var newtask = document.getElementById("newtask");
    var datetime = document.getElementById("taskdate");
    var details = document.getElementById("details");
    var tasklist = document.getElementById("tasklist");
    var completetask = document.getElementById("completetask");

    function delegate(ele, tag, eventName, listener) {
        addEvent(ele, eventName, function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (target.nodeName.toLowerCase() == tag) {
                listener(target);
            }
        });
    }

    function addEvent(ele, event, listener) {
        if (ele.addEventListener) {
            ele.addEventListener(event, listener, false);
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + event, listener);
        } else {
            ele["on" + event] = listener;
        }
    }

    delegate(newtask, 'input', 'change', function (target) {
        var taskname = newtask.value;
        var taskdate = datetime.value;
        var newlistitem = document.createElement("li");
        newlistitem.innerHTML = "<a><span class='checkbox'></span><span class='taskname'>" + taskname + "</span></a><time class='tasktime'>" + taskdate + "</time>";
        container.style.paddingRight = "250px";
        details.style.display = "block";
        newtask.value = "";
        datetime.value = "";
        var toinsertbefore = (tasklist.children.length > 0) ? tasklist.childNodes[0] : null;
        tasklist.insertBefore(newlistitem, toinsertbefore);
    });


    delegate(tasklist, 'span', 'click', function (target) {
        completetask.appendChild(target.parentNode.parentNode);
    });
    delegate(tasklist, 'a', 'click', function (target) {
        container.style.paddingRight = "250px";
        details.style.display = "block";
    });

    delegate(completetask, 'span', 'click', function (target) {
        tasklist.appendChild(target.parentNode.parentNode);
    });
};
