/**
 * Created by jzwmxz on 15-10-25.
 * P676
 * 创建一个Web Worker线程处理图片
 * 异步的将图片内容替换为动态模糊版本
 */
function smear(img) {
//    创建一个和图片尺寸相同的屏幕外<canvas>
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

//    将图片复制到画布中，随后提取其像素
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    var pixels = context.getImageData(0, 0, img.width, img.height);

//    将像素信息传递给worker线程
    var worker = new Worker("SmearWorker.js");
    worker.postMessage(pixels); //  复制传递像素信息

//    注册事件处理程序来获取Worker的响应
    worker.onmessage = function (e) {
        var smeared_pixels = e.data;     //  从Worker获取像素信息
        context.putImageData(smeared_pixels, 0, 0);      //   将其复制到画布中

        img.src = canvas.toDataURL(); //  添加到img
        worker.terminate(); //  关闭Worker线程
        canvas.width = canvas.height = 0;   //  将周围像素清空
    }
}
