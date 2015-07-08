/**
 * Created by 你的特仑苏 on 2015/7/8.
 *      P475
 *      过滤用户输入
 *  测试用例：
 *  <input id="zip" type="text" data-allowed-chars="0123456789" data-messageid="zipwarn">
 *      <span id="zipwarn" style="color:red;visibility:hidden">只支持数字</span>
 */
window.addEventListener("load", function () {
    var inputtels = document.getElementsByTagName("input");
    for (var i = 0; i < inputtels.length; i++) {
        var elt = inputtels[i];
        //    跳过不是文本域或没有data-allowed-chars属性的元素
        if (elt.type != "text" || !elt.hasAttribute("data-allowed-chars")) {
            continue;
        }

        if (elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false); //Chrome/Safari
            elt.addEventListener("tetinput", filter, false);  // DOM3
        } else {
            //  不支持addEventListener()的IE也不会支持textinput
            elt.attachEvent("onkeypress", filter);
        }
    }
    //  过滤用户输入的事件处理程序
    function filter(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var text = null;  // 输入的文本

        //    获取输入的字符或文本
        if (e.type === "textinput" || e.type === "textInput") text = e.data;
        else {  //  传统的keypress事件
            //  对于可打印键的keypress事件，Firefox使用charCode
            var code = e.charCode || e.keyCode;

            if (code < 32 ||
                e.charCode == 0 ||
                e.ctrlKey || e.altKey)
                return;
            var text = String.fromCharCode(code);
        }

        //    从input元素中寻找所需信息
        var allowed = target.getAttribute("data-allowed-chars");
        var messageid = target.getAttribute("data-messageid");
        if (messageid) {
            var messageElement = document.getElementById(messageid);

            //    遍历输入文本中的字符
            for (var i = 0; i < text.length; i++) {
                var c = text.charAt(i);
                if (allowed.indexOf(c) == -1) {    //  是否为允许字符?
                    if (messageElement) messageElement.style.visibility = "visible";

                    //    取消默认行为
                    if (e.preventDefault) e.preventDefault();
                    if (e.returnValue) e.returnValue = false;
                    return false;
                }
            }
            //  如果所有字符都合法
            if (messageElement) messageElement.style.visibility = "hidden";
        }
    }
}, false);

