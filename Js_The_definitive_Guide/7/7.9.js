/**
 * Created by ��������� on 2015/5/15.
 */
/*
 �������в������г��ֵ�x��������һ������ƥ������������
 P160
 */
function findall(a, x) {
    var result = [],
        len = a.length,
        pos = 0;                    // ��ʼ������λ��
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;      //  δ�ҵ������������
        result.push(pos);
        pos += 1;                   //  ����һ��λ�ÿ�ʼ����
    }
    return result;
}
var a = [1, 1, 2, 3];
console.log(findall(a,1))
