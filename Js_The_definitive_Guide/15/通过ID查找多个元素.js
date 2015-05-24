function getElements () {
	var elements={};
	for(var i=0;i<arguments.length;i++) {
		var id=arguments[i];
		var elt=document.getElementById(id);
		if(elt == null)
			throw new Error("No element with id" + id);
		elements[id]=elt;
	}
	return elements;
}