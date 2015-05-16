/**
 * Created by дЦ╣дльбьку on 2015/5/15.
 */
var o={
    m: function () {
        var self=this;
        //console.log(this===o);
        console.log(this);
        f();
        function f(){
          //  console.log(this===o);
            console.log(self===o);
            console.log(this);
            console.log(self);
        }
    }
};
o.m();