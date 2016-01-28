define([
    '{pro}module/flow/request.js',
    '{pro}module/flow/config.js',
    '{pro}module/flow/view/success.js',
    '{pro}module/flow/view/widget.js',
    '{pro}widget/ui/Toast.js'
], function() {
    'use strict';

    var _widget = NEJ.P('app.widget'),
        _ui     = NEJ.P('music.mobile.ui'),
        _ut     = NEJ.P('music.mobile.util'),
        _conf   = NEJ.P('app.config'),
        _data   = NEJ.P('app.data'),
        _view   = NEJ.P('app.view');

    // 开通页
    _view._$$OpenView = Backbone.View.extend({
        template: _.template($('#open-tpl').html()),

        className: 'n-potral',

        events: {
            'click': '__onClick'
        },

        initialize: function(_options) {
            this.__snote = new _widget._$$ServiceNote({
                title:      '活动说明',
                notes:      _conf.__NOTES,
                showHelp:   true,
                fold:       false
            });
        },

        render: function() {
            this.$el.html(this.template({}));
            this.$el.find('#ui-snote').html(this.__snote.render().$el);
            return this;
        },

        __onOpen: function(_rsp) {
            console.log(_rsp);
            if (_rsp.code == 200) {
                // 领取成功
                _data._$set('shareid', _rsp.shareid || '');
                this.__onSuccess({
                    inapp: _data._$isInApp(),
                    valid: true
                });

            } else {
                // 已领取过
                _data._$set('shareid', _rsp.shareid || '');
                this.__onSuccess({
                    inapp: _data._$isInApp(),
                    valid: false
                });

                // TODO 领取失败
            }
        },

        __onSuccess: function(_options) {
            var _shareid = _data._$get('shareid');

            _data._$inviteList({})
            _view.__router.__successView(_options);
        },

        __onSendCaptcha: function(_rsp) {
            console.log(_rsp);
            if (_rsp.code == 200) {
                var _button = this.$el.find('.code');
                this.__countdown(_button, 59);
            } else {
                // TODO 其他错误提示
            }
        },

        __countdown: function(_button, _during) {
            // 正在倒计时时，不需要操作
            if (this.__timer) return;

            var _start   = new Date,
                _remain  = null;

            _button.text('00:59');
            _button.prop('disabled', true);
            _button.addClass('code-timing');

            this.__timer = setInterval(_.bind(function() {
                _remain = _during - (new Date - _start) / 1000;

                if (_remain >= 0) {
                    _button.text('00:' + ('0' + ~~_remain).slice(-2));
                } else {
                    clearInterval(this.__timer);
                    this.__timer = null;
                    _button.text('重新发送');
                    _button.prop('disabled', false);
                    _button.removeClass('code-timing');
                }

            }, this), 250)
        },

        __validatePhone: function() {
            var _input = this.$el.find('.phone'),
                _value = _input.val();

            if (!_value) { 
                _ui.Toast.error('请输入手机号');
                return false;
            }

            if (!/\d{11}/.test(_value)) {
                _ui.Toast.error('手机号应该是11位数字');
                return false;
            }

            return _value;
        },

        __validateCaptcha: function() {
            var _input = this.$el.find('.captcha'),
                _value = _input.val();

            if (!_value) { 
                _ui.Toast.error('请输入验证码');
                return false;
            }

            return _value;
        },

        __onClick: function(_event) {
            var _target = $(_event.target),
                _action = _target.data('action');

            if (!_action) return;

            switch (_action) {
                // 发送验证码
                case 'send':

                    var _phone = this.__validatePhone();

                    if (!_phone) break;

                    _data._$sendCaptcha({
                        cellphone: _phone
                    }, _.bind(this.__onSendCaptcha, this));

                    break;

                // 开通
                case 'open':

                    var _phone = this.__validatePhone(),
                        _captcha = this.__validateCaptcha();

                    if (!_phone || !_captcha) break;

                    _data._$openFlow({
                        cellphone:  _phone,
                        captcha:    _captcha,
                        sharedby:   MODEL.shareid
                    }, _.bind(this.__onOpen, this));
                    break;

                // TODO 分享，不带分享id
                case 'share':

                    break;
            }
        }
    });

});