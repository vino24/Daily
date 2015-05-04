/**
 * Created by дЦ╣дльбьку on 2015/4/30.
 */
var a=[];
a.push(1,2,3);
a.reverse();

function Point(x,y) {
    this.x=x;
    this.y=y;
}
var p=new Point(1,1);
Point.prototype.r=function() {
    return Math.sqrt(this.x*this.x+this.y*this.y);
}
p.r();
console.log(p.r());