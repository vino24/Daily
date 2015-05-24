/**
 * Created by ��������� on 2015/5/24.
 *  P385
 */
//  Ϊ��֧��outerHTML���Ե������ʵ��outerHTML����

(function () {
    if (document.createElement("div").outerHTML) return;

    function outerHTMLGetter() {
        var container = document.createElement("div");    //  ����Ԫ��
        container.appendChild(this.cloneNode(true));    //  ���Ƶ�����ڵ�
        return container.innerHTML;
    }

    function outerHTMLSetter(value) {
        //  ��������Ԫ��
        var container = document.createElement("div");
        container.innerHTML = value;

        //  ������Ԫ���еĽڵ�ȫ���ƶ����ĵ���
        while (container.firstChild)
            this.parentNode.insertBefore(container.firstChild, this);
        //  ɾ������ȡ���Ľڵ�
        this.parentNode.removeChild(this);
    }

    //  ES5
    if (Object.defineProperty) {
        Object.defineProperty(Element.prototype, "outerHTML", {
            get: outerHTMLGetter, set: outerHTMLSetter,
            enumerable: false, configurable: true
        });
    }
    //  ES3
    else {
        Element.prototype.__defineGetter__("outerHTML", outerHTMLGetter);
        Element.prototype.__defineSetter__("outerHTML", outerHTMLSetter);
    }
}());
