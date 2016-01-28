define([
    '{lib}base/global.js'
], function() {
    
    'use strict';
    var _ut = NEJ.P('music.mobile.util');

    /**
     * 日期格式化方法扩展
     * @param fmt
     * @returns {*}
     */
    Date.prototype.format = function (fmt) {
        if (isNaN(this.getTime())) return '';
        
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    };

    /**
     * android 2.3 需要自定义 Function.prototype.bind
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
     */
    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
          // closest thing possible to the ECMAScript 5
          // internal IsCallable function
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
              return fToBind.apply(this instanceof fNOP
                     ? this
                     : oThis,
                     aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype) {
          // native functions don't have a prototype
          fNOP.prototype = this.prototype; 
        }
        fBound.prototype = new fNOP();

        return fBound;
      };
    }

    /**
     * 隐藏手机号中间四位
     * @param phone
     * @returns {string}
     */
    _ut.phoneMask = function(phone) {
        if (phone) {
            phone += '';
            return phone.substr(0, 3) + '****' + phone.substr(phone.length - 4);
        } else {
            return '';
        }
    };

    /**
     * 是否是手机号判断
     */
    _ut.isPhone = function(phone){
        return /^\d{11}$/.test(phone);
    };

    /**
     * 将HTML字符串转义掉
     */
    _ut.escapeHTML = function(html) {
        if (typeof html != 'string') return html;
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    };

    /**
     * 取值：_ut.cookie(key)
     */
    _ut.cookie = function(key) {
        if (!key) return '';
        // if (typeof value == 'string') return document.cookie = (key + '=' + value);
        var value = '';
        _.forEach(document.cookie.split(/\s*;\s*/), function(pair) {
            var tokens = pair.split('=');
            if (tokens[0] == key) value = tokens[1];
        });
        return value;
    };
});