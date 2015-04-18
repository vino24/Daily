function reverse (n) {
	var f=document.createDocumentFragment();

	//	从后至前循环子节点，将每一个节点移动到文档片段中
	//	给f添加一个节点，该节点自动地从n中删除 
	while(n.lastChild)
		f.appendChild(n.lastChild);
	n.appendChild(f);
}