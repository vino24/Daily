/**
 * Created by 你的特仑苏 on 2015/7/29.
 * 图片翻转
 * P608
 *
 * HTML：
 *  <img src="http://img.xiami.net/images/collect/434/34/29083434_1393338155_RBUE_4.jpg" data-rollover="http://img5.douban.com/lpic/s27353746.jpg">
 */
window.onload = function () {
    var images = document.images;   //Object
    var images=[].slice.call(images);   //  转化为Array
    images.forEach(function (img) {
        var rollover = img.dataset.rollover;
        //    确保将翻转的图片缓存起来
        (new Image()).src = rollover;

        //    定义一个属性来标识默认的图片URL
        img.setAttribute("data-rollout", img.src);

        img.onmouseover = function () {
            this.src = this.dataset.rollover;
        };
        img.onmouseout = function () {
            this.src = this.dataset.rollout;
        };
    });
};
