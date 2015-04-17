/*
*	递归地把n的后代子节点的所有Text节点内容转换为大写形式
 */
	function upcase (n) {
		if(n.nodeType == 3 || n.nodeType == 4)
			n.data=n.data.toUpperCase();
		else
			for(var i=0;i<n.childNodes.length;i++)	// 递归进入子节点
				upcase(n.childNodes[i]);
	}