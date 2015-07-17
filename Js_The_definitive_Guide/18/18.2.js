/*
    ʹ��scriptԪ�ط���JSONP����
    P507
 */
//  ����ָ����URL����һ��JSONP����
//  �ѽ����õ�����Ӧ���ݴ��ݸ��ص�����
//  ��URL�����һ����Ϊjsonp�Ĳ�ѯ����������ָ��������Ļص�����������

function getJSONP(url,callback) {
    // Ϊ�������󴴽�һ��Ψһ�Ļص���������
    var cbnum="cb"+getJSONP.counter++;
    var cbname="getJSONP."+cbnum;   //  ��ΪJSONP����������

//    ���ص����������Ա��������ʽ��ӵ�URL�Ĳ�ѯ����
//    ʹ��jsonp��Ϊ������
    if(url.indexOf("?")===-1) //URLû�в�ѯ����
    url+="?jsonp"+cbname;
    else
    url+="&jsonp"+cbname;

    var script=document.createElement("script");
    //  Ϊÿ��������һ��ȫ�µ��ڲ��ص�������������ΪgetJSONP��һ�����Դ洢����
    getJSONP[cbnum]= function (response) {
        try{
            callback(response);
        }
        finally {
            delete getJSONP[cbnum];
            script.parentNode.removeChild(script);
        }
    };

//    ����HTTP����
    script.src=url;
    document.body.appendChild(script);
}
getJSONP.counter=0;     //  ���ڴ���Ψһ�ص������ļ�����