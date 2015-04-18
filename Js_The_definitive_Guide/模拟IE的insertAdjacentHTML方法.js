// 本模块为不支持insertAdjacentHTML()的浏览器定义Element.insertAdjacentHTML
// 同时定义可移植的HTML插入函数：Insert.before() Insert.after() Insert.atStart() Insert.atEnd()

var Insert = (function  () {
	// 如果支持原生的insertAdjacentHTML,在4个函数名更明了的HTML插入函数中使用它
		if(document.createElement("div").insertAdjacentHTML) {
			return {
				before:function  (e,h) {e.insertAdjacentHTML("beforebegin",h);},
				after:function  (e,h) {e.insertAdjacentHTML("afterend",h);},
				atStart:function (e,h) {e.insertAdjacentHTML("afterbegin",h);},
				atEnd:function  (e,h) {e.insertAdjacentHTML("beforeend",h);}
			};

			// 无原生的insertAdjacentHTML
			// 实现同样的4个插入函数，并使用它们来定义insertAdjacentHTML
			
			// 首先定义一个工具函数，传入HTML字符串，返回一个DocumentFragment
			function fragment (html) {
				var elt=document.createElement("div");
				var frag=document.createDocumentFragment();
				elt.innerHTML=html;
				while(elt.firstChild)
					frag.appendChild(elt.firstChild);
				return frag;
			}

			var Insert = {
				before:function(elt,html){elt.parentNode.insertBefore(fragment(html),elt);},
				after:function(elt,html){elt.parentNode.insertBefore(fragment(html),elt.nextSibling);},
				atStart:function(elt,html){elt.insertBefore(fragment(html),elt.firstChild);},
				atEnd:function(elt,html){elt.insertBefore(fragment(html),elt.appendChild(fragment(html));}
			};

			// 基于以上函数实现insertAdjacentHTML
			Element.prototype.insertAdjacentHTML=function  (pos,html) {
				switch(pos.toLowerCase()){
					case "beforebegin":return Insert.before(this,html);
					case "afterend":return Insert.after(this,html);
					case "afterbegin":return Insert.atStart(this,html);
					case "beforeend":return Insert.atEnd(this,html);
				}
			};
			return Insert;
		}
}());