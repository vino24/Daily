/**
 * Created by ��������� on 2015/5/10.
 */
/*
 *    ����ö�����ԵĶ��󹤾ߺ���
 */

/*
 *     ��p�еĿ�ö�����Ը��Ƶ�o��
 *    ���o��p����ͬ�����ԣ��򸲸�
 */
function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
}
/*
 *   ��p�п�ö�����Ը��Ƶ�o��
 *   ���o��p����ͬ�����ԣ�o�����Բ���Ӱ��
 */
function merge(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
}

/*
* ���o�е�������p��û��ͬ�����ԣ����o��ɾ��
*/
function restrict(o,p) {
    for(prop in o) {
        if(!(prop in p)) delete o[prop];
    }
    return o;
}

/*
* ���o��������p�д���ͬ�����ԣ����o��ɾ��
*/
function subtract(o,p) {
    for(prop in p) {
        delete o[prop];
    }
    return o;
}

/*
* ����һ���¶����������ͬʱӵ��o��p������
* ���o��p�����������ԣ�ʹ��p������ֵ
*/
function union(o,p) {
    return extend(extend({},o),p);
}

/*
* ����һ���¶����������ӵ��ͬʱ��o��p�г��ֵ�����
* ������o p��������p�����Ա�����
*/
function intersection(o,p) {
    return restrict(extend({},o),p);
}

/*
* ����һ�����飬�����������o�п�ö�ٵ��������Ե�ֵ
*/
function keys(o) {
    if(typeof o!=="object") throw TypeError();
    var result=[];
    for(var prop in o) {
        if(o.hasOwnProperty(prop))
        result.push(prop);
    }
    return result;
}
