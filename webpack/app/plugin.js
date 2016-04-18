/**
 * Created by jzwmxz on 16-4-18.
 * jzwmxz@hotmail.com
 */
/*
 jQuery plugin
 */
(function ($) {
    const shade = "#556b2f";
    $.fn.greenify = function () {
        this.css("color", shade);
        return this;
    }
}(jQuery));
