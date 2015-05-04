/**
 * Created by ÄãµÄÌØÂØËÕ on 2015/5/4.
 */
var text="testing:1,2,3";
var pattern=/\d+/;
pattern.test(text);
text.search(pattern);
text.match(pattern);
text.replace(pattern,"#");
text.split(/\D+/);
