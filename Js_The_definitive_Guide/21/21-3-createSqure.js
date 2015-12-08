/**
 * Created by jzwmxz on 15-10-22.
 * 参数：
 *      data:用于绘制的数字类型数组，数组的每一项表示饼形图的一块
 *      width,height：SVG图形的大小
 *      cx,cy,r：圆心及半径
 *      colors：包含HTML颜色的数组，每种颜色代表饼形图每块的颜色
 *      labels：标签数组，说明每块的意义
 *      lx,ly:饼形图的左上角
 * 返回：
 *      一个保存饼形图的<svg>元素
 */
function pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
    //  svg的XML命名空间
    var svgns = "http://www.w3.org/2000/svg";

    //  创建<svg>元素，同时指定像素大小和用户坐标
    var chart = document.createElementNS(svgns, "svg:svg");
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("viewBox", "0 0 " + width + " " + height);

    //  累加data的值，以便知道饼形图的大小
    var total = 0;
    for (var i = 0; i < data.length; i++) total += data[i];

    //  计算出饼形图每块的大小，角度以弧度计算
    var angles = [];
    for (var i = 0; i < data.length; i++) angles[i] = data[i] / total * Math.PI * 2;

    //  遍历饼形图的每块
    startangle = 0;
    for (var i = 0; i < data.length; i++) {
        //  每块的结束位置
        var endangle = startangle + angles[i];

        //  以12点方向为0度
        //  顺时针
        var x1 = cx + r * Math.sin(startangle);
        var y1 = cy - r * Math.cos(startangle);
        var x2 = cx + r * Math.sin(endangle);
        var y2 = cy - r * Math.cos(endangle);

        //  标记角度是否大于半圆
        var big = 0;
        if (endangle - startangle > Math.PI) big = 1;

        //  使用<svg:path>描述块
        var path = document.createElementNS(svgns, "path");

        //  路径信息
        var d = "M " + cx + "," + cy +   //  从圆心开始
            " L " + x1 + "," + y1 +    //  画一条(x1,y1)的线段
            " A " + r + "," + r +      //  再画一条半径为r的弧
            " 0 " + big + " 1 " +    //  弧的详细i信息
            x2 + "," + y2 +          //  到(x2,y2)结束
            " Z";

        //  设置<svg:path>元素的属性
        path.setAttribute("d", d);   //  设置路径
        path.setAttribute("fill", colors[i]) //  设置颜色
        path.setAttribute("stroke", "black");    //  外边框颜色
        path.setAttribute("stroke-width", "2");  //  两个单位宽
        chart.appendChild(path);

        startangle = endangle;

        //  绘制相应的小方块表示图例
        var icon = document.createElementNS(svgns, "rect");
        icon.setAttribute("x", lx);
        icon.setAttribute("y", ly + 30 * i);
        icon.setAttribute("width", 20);
        icon.setAttribute("height", 20);
        icon.setAttribute("fill", colors[i]);
        icon.setAttribute("stroke", "black");
        icon.setAttribute("stroke-width", "2");
        chart.appendChild(icon);

        //  添加标签
        var label = document.createElementNS(svgns, "text");
        label.setAttribute("x", lx + 30);
        label.setAttribute("y", ly + 30 * i + 18);
        label.setAttribute("font-family", "sans-serif");
        label.setAttribute("font-size", 16);
        label.appendChild(document.createTextNode(labels[i]));
        chart.appendChild(label);
    }
    return chart;
}