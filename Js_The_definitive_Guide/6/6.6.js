/**
 * Created by ��������� on 2015/5/11.
 */

/*
 *  ����������Ĵ洢������
 */
var random = {
    get octet() {
        return Math.floor(Math.random() * 256);
    },
    get uint16() {
        return Math.floor(Math.random() * 65536);
    }
};