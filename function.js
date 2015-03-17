	var canvas;
	var context;
	window.onload=function(){
		canvas=document.getElementById("drawingCanvas");
		context=canvas.getContext("2d");
		
		//添加用于实现绘图操作的事件处理程序
		canvas.onmousedown = startDrawing;
		canvas.onmouseup   = stopDrawing;
		canvas.onmouseout  = stopDrawing;
		canvas.onmousemove = draw;
		};
	//记录此前为选择颜色而被单击过<img>元素
	var previousColorElement;

	function changeColor(color,imgElement){
		//重新设置当前绘图要使用的颜色
		context.strokeStyle=color;
		//为刚被单击过的<img>元素应用新样式
		imgElement.className="Selected";

		//恢复上一次被单击<img>元素的样式
		if (previousColorElement!=null) {
			previousColorElement.className="";
		}
		previousColorElement=imgElement;
	}
	var previousThicknessElement;

	function changeThickness(thickness,imgElement){
		//重新设置当前绘图要使用的粗细
		context.lineWidth=thickness;
		//为刚被单击过的<img>元素应用新样式
		imgElement.className="Selected";

		//恢复上一次被单击<img>元素的样式
		if (previousThicknessElement!=null) {
			previousThicknessElement.className="";
		}
		previousThicknessElement=imgElement;
	}
	var isDrawing=false;

	function startDrawing (e) {
		// 开始绘图
		isDrawing=true;
		//创建新路径
		context.beginPath();

		//把画笔放到鼠标当前所在位置
		context.moveTo(e.pageX - canvas.offsetLeft,e.pageY - canvas.offsetTop);	 //e 事件对象 pageX,pageY相对于整个页面坐标 offsetLeft offsetTop浏览器左上角到画布左上角距离	
	}

	function draw (e) {
		if (isDrawing==true) {
			// 找到鼠标的新位置
		var x=e.pageX - canvas.offsetLeft;
		var y=e.pageY-canvas.offsetTop;

		/* 画矩形，圆形无法正常运行
		if(imgElement.id==document.getElementById("Square")){
			context.fillRect(x,y,100,100);
			strokeRect(x,y,100,100);
		} else if(imgElement.id==document.getElementById("Round")){
			context.arc(x,y,100,0,2*Math.PI);
			context.stroke();
		} else {
		*/
			//画一条到新位置的线
		context.lineTo(x,y);
		context.stroke();
	/*	}	*/
		}
	}

	function stopDrawing () {
		isDrawing=false;
	}

	function clearCanvas () {
		context.clearRect(0,0,canvas.width,canvas.height);		//清空整个画布
	}

	//将画布保存为图像
	function saveCanvas () {
		// 找到<img>元素
		var imageCopy=document.getElementById("savedImageCopy");

		//在图像中显示画布数据
		imageCopy.src=canvas.toDataURL();	//toDataUR("image/jpeg")函数取得当前数据URL，不提供参数默认得到PNG图片
		/* 数据URL是一个以data:image/png;base64开头的base-64编码的字符串 */

		//显示包含<img>元素的<div>,以便把图像显示出来
		var imageContainer=document.getElementById("savedCopyContainer");
		imageContainer.style.display="block";
	}

	function changeRoundness (imgElement) {
		
		imgElement.className="Selected";
		if (previousColorElement!=null) {
			previousColorElement.className="";
		}
		previousColorElement=imgElement;
	}
	function changeSquareness (imgElement) {
		
		imgElement.className="Selected";
		if (previousColorElement!=null) {
			previousColorElement.className="";
		}
		previousColorElement=imgElement;
	}