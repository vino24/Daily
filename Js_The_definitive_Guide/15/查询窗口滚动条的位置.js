/**
 * Created by ��������� on 2015/5/25.
 *  P390
 */
//  ��һ�������x��y���Եķ�ʽ���ع�������ƫ����
function getScrollOffsets(w) {
    w = w || window;

    //  ��<IE8����
    if (w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};

    //  ��׼ģʽ�µ�IE�����κ��������
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

    //  ����ģʽ�µ������
    return {x: d.body.scrollLeft, y: d.body.scrollTop};
}
