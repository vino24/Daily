/**
 * Created by ��������� on 2015/5/15.
 * �ж϶����Ƿ�Ϊ���������
 *  P162
 */
//  �ַ����ͺ�����length���ԣ�������typeof����ų����ͻ���JavaScript�У�DOM�ı��ڵ���length���ԣ�
// ������o.nodetype!=3����ų�
function isArrayLike(o) {
    if (o &&                                    // o�Ƿ�null��undefined��
        typeof o === "object" &&                // o�Ƕ���
        isFinite(o.length) &&                   // o.length��������ֵ
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&    // o.length������
        o.length < 4294967296)
        return true;
    else
        return false;
}