/**
 * 数据接口
 * MODEL.shareid 别人的分享id
 * _data._$get('shareid') 自己的分享id
 */
define([
    '{lib}base/global.js',
    '{pro}widget/util/extend.js'
], function() {
    'use strict';

     var _data = NEJ.P('app.data');

   /**
    * 保存视图之间共享的数据
    */
    var _storage = {
    };

    _data._$set = function(key, value) {
        _storage[key] = value;
    };

    _data._$get = function(key) {
        return _storage[key];
    };

    // AJAX
    _data._$request = function(method, url, params, enableCache) {
        params = params || {};
        method = method || 'get';

        var key = url + JSON.stringify(params);

        function then(resolve) {
            if (enableCache && _data.get(key)) {
                setTimeout(function() {
                    resolve(_data.get(key));
                }, 0);
            } else {
                $.ajax({
                    type:       method,
                    url:        url,
                    data:       params,
                    // timeout:  10000, // 设置10秒超时时间
                    success:    function(responseText) {
                        if (typeof responseText === 'string') {
                            responseText = responseText || '{}';
                            responseText = JSON.parse(responseText);
                        }
                        if (enableCache) _data.set(key, responseText);
                        resolve(responseText);
                    },
                    error:      function() {
                        // 把网络错误归结为超时
                        var responseText = {code: 504};
                        resolve(responseText);
                    }
                });
            }
        }
        return {then: then};
    };

    var _base = '';
    var _dayms = 24*3600*1000;//FIXME for mock
    var _interfaces = {

        // 查询开通状态
        _$getStatus: {
            url: '',
            mock: {code: 200, isOpened: false}
        },

        // 发送验证码
        _$sendCaptcha: {
            url: '',
            mock: {code: 200}
        },

        // 开通流量包
        _$openFlow: {
            url: '',
            mock: {code: 200, shareid: 'xxx'}
        },

        // 查看我的邀请列表
        _$inviteList: {
            url: '',
            mock: {code: 200, cellphones: ['123****5678', '123****5678', '123****5678', '123****5678', '123****5678', '123****5678', '123****5678', '123****5678', '123****5678'], count: 12, month: 4}
        }
    };

    _.forEach(_interfaces, function(value, name) {
        _data[name] = function(params, resolve){
            if(typeof params === 'function') {
                resolve = params;
                params = {};
            }

            if (value.mock) {
                return setTimeout(_.bind(resolve, null, value.mock), 500);
            }

            _data._$request(
                value.type,             // get 或者 post
                _base + value.url,      // 请求地址
                params,
                value.enableCache       // 是否缓存结果
            ).then(resolve);
        }
    });

    _data._$orpheus = {
        // 不建议直接调用该方法
        call: function(url) {
            var iFrame;
            iFrame = document.createElement("iframe");
            iFrame.setAttribute("src", url);
            iFrame.setAttribute("style", "display:none;");
            iFrame.setAttribute("height", "0px");
            iFrame.setAttribute("width", "0px");
            iFrame.setAttribute("frameborder", "0");
            document.body.appendChild(iFrame);
            iFrame.parentNode.removeChild(iFrame);
            iFrame = null;
            // console.log(url);
            return this;
        },

        // 修改设备的免流量状态
        changeFlowStatus: function(status) {
            this.call('orpheus://flow/status/change?' + $.param({
                status:     status.status,
                sptype:     status.spType,
                phonenum:   status.cellphone || ''
            }));
        }
    };

    /**
     * 页面埋点
     */
    _data._$logAction = function(action, json) {
        $.post('/api/log/web/mobile', {
            action: action,
            json: JSON.stringify(json)
        });
    };

    /**
     * 判断是否在app内
     */
    _data._$isInApp = function() {
        return /\bappver\b/.test(document.cookie);
    };


});