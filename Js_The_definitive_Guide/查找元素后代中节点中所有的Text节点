/*
*	返回元素e的纯文本内容，递归进入其子元素
 */
function textContent (e) {
	var child,type,s="";	//	s保存所有子节点的文本
	for(child=e.firstChild;child!=null;child=child.nextSibling) {
		type=child.nodeType;
		if(type ===3 || type === 4)		//Text和CDATASection节点
			s+=child.nodeValue;
		else if(type === 1)
			s+=textContent(child);		// 递归Element节点
	}
	return s;
}