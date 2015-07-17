/*
    使用script元素发送JSONP请求
    P507
 */
//  根据指定的URL发送一个JSONP请求
//  把解析得到的响应数据传递给回调函数
//  在URL中添加一个名为jsonp的查询参数，用于指定该请求的回调函数的名称

function getJSONP(url,callback) {
    // 为本次请求创建一个唯一的回调函数名称
    var cbnum="cb"+getJSONP.counter++;
    var cbname="getJSONP."+cbnum;   //  作为JSONP函数的属性

//    将回调函数名称以表单编码的形式添加到URL的查询部分
//    使用jsonp作为参数名
    if(url.indexOf("?")===-1) //URL没有查询部分
    url+="?jsonp"+cbname;
    else
    url+="&jsonp"+cbname;

    var script=document.createElement("script");
    //  为每个请求定义一个全新的内部回调函数，函数作为getJSONP的一个属性存储起来
    getJSONP[cbnum]= function (response) {
        try{
            callback(response);
        }
        finally {
            delete getJSONP[cbnum];
            script.parentNode.removeChild(script);
        }
    };

//    触发HTTP请求
    script.src=url;
    document.body.appendChild(script);
}
getJSONP.counter=0;     //  用于创建唯一回调函数的计数器