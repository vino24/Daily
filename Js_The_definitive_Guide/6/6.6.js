/**
 * Created by 你的特仑苏 on 2015/5/11.
 */

/*
 *  返回随机数的存储器属性
 */
var random = {
    get octet() {
        return Math.floor(Math.random() * 256);
    },
    get uint16() {
        return Math.floor(Math.random() * 65536);
    }
};