	/*
	*	返回元素e的n层祖先元素，如果不存在或不是Element，返回null
	*	nodeType属性返回值：
	*	9代表Document节点;1代码Element;3代表Text
	 */
	function parent (e,n) {
		if(n===undefined) n=1;
		while(n-- && e) e=e.parentNode;
		if(!e || e.nodeType!=1)
			return null;
		return e;
	}
	/*
	*	返回元素e的第n个兄弟元素
	*	n为正，返回后续的第n个兄弟元素
	*	n为负，返回前面的第n个兄弟元素
	*	n为零，返回e本身
	 */
	function sibling (e,n) {
		while (e && n !== 0) {
			if (n > 0) {
				if (e.nextElementSibling) e = e.nextElementSibling;
				else {
					for (e = e.nextElementSibling; e && e.nodeType !== 1; e = e.nextElementSibling)
						/* 空循环 */;
				}
				n--;
			}

			else {
				if (e.previousElementSibling) e = previousElementSibling;
				else {
					for (e = e.previousElementSibling; e && e.nodeType !== 1; e = e.previousElementSibling)
						/*	空循环	*/;
				}
				n++;
			}
			return e;
		}
	}
	function child (e,n) {
		if (e.children) {
			if (n < 0) n += e.children.length;		//转换负的n为数组索引
			if (n < 0) return null;				//如果仍然为负，说明没有子元素
			return e.children[n];				//返回指定子元素
		}

		// 如果e没有children数组
		if (n >= 0) {
			if (e.firstElementChild) e = e.firstElementChild;
			else {
				for (e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling)
					/*  空循环  */;
			}
			return sibling(e, n);
		}
		else {
			if (e.lastElementChild) e = e.lastElementChild;
			else {
				for (e = e.lastChild; e && e.nodeType !== 1; e = e.previousSibling)
					/* 空循环 */;
			}
			return sibling(e, n + 1);
		}
	}

	/*
	*	返回元素e的第n代子元素
	*	负值代表从后往前计数，0表示第一个子元素，-1代表最后一个，-2代码倒数第二个
	 */

