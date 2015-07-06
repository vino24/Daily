/**
 * Created by ��������� on 2015/7/6.
 *  P455
 *  ���attachEvent()ע��Ĵ������thisֵΪȫ��window����ķ���
 */
function addEvent(target, type, handler) {
    if (target.addEventListener)
        target.addEventListener(type, handler, false);
    else
        target.attachEvent("on" + type,
            function (event) {
                //  �Ѵ��������Ϊ�¼�Ŀ��ķ������ã�
                //  �����¼�����
                return handler.call(target, event);
            });
}
