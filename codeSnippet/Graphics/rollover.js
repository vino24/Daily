/**
 * Created by ��������� on 2015/7/29.
 * ͼƬ��ת
 * P608
 *
 * HTML��
 *  <img src="http://img.xiami.net/images/collect/434/34/29083434_1393338155_RBUE_4.jpg" data-rollover="http://img5.douban.com/lpic/s27353746.jpg">
 */
window.onload = function () {
    var images = document.images;   //Object
    var images=[].slice.call(images);   //  ת��ΪArray
    images.forEach(function (img) {
        var rollover = img.dataset.rollover;
        //    ȷ������ת��ͼƬ��������
        (new Image()).src = rollover;

        //    ����һ����������ʶĬ�ϵ�ͼƬURL
        img.setAttribute("data-rollout", img.src);

        img.onmouseover = function () {
            this.src = this.dataset.rollover;
        };
        img.onmouseout = function () {
            this.src = this.dataset.rollout;
        };
    });
};
