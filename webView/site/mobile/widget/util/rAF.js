/**
 * music.mobile.util.requestAnimationFrame
 * music.mobile.util.cancelAnimationFrame
 */
define([
    '{lib}base/global.js'
], function() {
    'use strict';

    var _rAF = (function() {
        return window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               function(callback) {
                   window.setTimeout(callback, 16);
               };
    }());

    (function(ns) {
        ns.requestAnimationFrame = function(cb) {
            return _rAF(cb || _.noop);
        };

        ns.cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame;

  }(NEJ.P('music.mobile.util')));
});