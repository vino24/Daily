/**
 * Created by ÄãµÄÌØÂØËÕ on 2015/5/20.
 *  ½âÎöURL
 *      P263
 */
var url=/(\w+):\/\/([\w.]+)\/(\S*)/;
var text="http://www.iminyao.com";
var result=text.match(url);
if(result!=null){
    var fullurl=result[0];
    var protool=result[1];
    var host=result[2];
    var path=result[3];
}