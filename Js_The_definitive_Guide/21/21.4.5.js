/**
 * Created by jzwmxz on 15-10-24.
 * P636
 * 在路径中添加曲线
 */
var canvas = document.getElementById("c1");
var c = canvas.getContext('2d');
//  工具函数，用于将角度转化为弧度
function rads(x) {
    return x * Math.PI / 180;
}

//  绘制一个圆形
c.beginPath();
c.arc(75, 100, 50, 0, rads(360), false);

//  绘制一个块
c.moveTo(200, 100);
c.arc(200, 100, 50, rads(-60), rads(0), false);
c.closePath();

//  同样的块，但方向相反
c.moveTo(325, 100);
c.arc(325, 100, 50, rads(-60), rads(0), true);   //  逆时针
c.closePath();

//  使用arcTo()方法来绘制圆角
c.moveTo(450, 50);
c.arcTo(500, 50, 500, 150, 30);
c.arcTo(500, 150, 400, 150, 20);
c.arcTo(400, 150, 400, 50, 10);
c.arcTo(400, 50, 500, 50, 0);
c.closePath();

//  二次贝塞尔曲线，一个控制点
c.moveTo(75, 250);
c.quadraticCurveTo(100, 200, 175, 250);
c.fillRect(100 - 3, 200 - 3, 6, 6);

//  三次贝塞尔曲线
c.moveTo(200, 250);
c.bezierCurveTo(220, 220, 280, 280, 300, 250);
c.fillRect(220 - 3, 220 - 3, 6, 6);
c.fillRect(280 - 3, 280 - 3, 6, 6);

//  定义一些图形属性并绘制曲线
c.fillStyle = "#aaa";
c.lineWidth = 5;
c.fill();
c.stroke();