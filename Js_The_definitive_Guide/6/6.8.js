/**
 * Created by ��������� on 2015/5/11.
 * ���ش��ݵ�����������
 * P139
 */
function classof(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}
