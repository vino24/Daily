/*
 * var vcodeInput = new VCodeInput();

 * [方法]
 * vcodeInput.countdown(59)
 * vcodeInput.disable()
 * vcodeInput.enable()
 * vcodeInput.stopCountdown('再次发送')

 * [事件]
 * vcodeInput.on('input', function(vcode) {}) // 输入验证码时触发
 * vcodeInput.on('click', function() {}) //  点击“发送验证码”时触发

 */
define([
    '{lib}base/global.js',
    '{pro}widget/util/extend.js'
], function() {
    var _ui = NEJ.P('music.mobile.ui');

    var COUNTDOWN_UPDATE = 250, // 倒计时时，更新时间的频率
        COUNTDOWN_START  = 59,  // 倒计时开始的秒数
        LABEL            = '发送验证码',
        LABEL_AGAIN      = '再次发送';

    var _buildHTML = function(model) {
        var h = [];

        h.push('<div>');
        h.push('<input type="tel" class="u-vcode" placeholder="<%=placeholder%>"/>');
        h.push('<button class="u-btn u-countdown s-default"><%=label%></button>');
        h.push('<a href="javascript:;" class="u-cleararea f-hide"><span class="u-icon u-icon-clear"></span></a>');
        h.push('</div>');
        h.push('<p class="u-codehelp">没收到？请联系客服：<a href="tel:<%=helpNumber%>"><%=helpNumber%></a></p>');

        return _.template(h.join(''))(model);
    };

    var VCodeInput = _ui.VCodeInput = Backbone.View.extend({
        className: 'vcode-input',
        events: {
            'click .u-countdown':   'onClick',
            'input .u-vcode':       'onInputVCode',
            'click .u-cleararea':   'clear'
        },
        initialize: function(options) {
            options             = options || {};
            options.helpNumber  = options.helpNumber || '';
            options.label       = options.label || LABEL;
            options.placeholder = options.placeholder || '验证码';

            this.options = options;
        },
        render: function() {
            this.$el.html(_buildHTML(this.options));
            return this;
        },

        remove: function() {
            this.stopCountdown();
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        // 点击发送验证码
        onClick: function() {
            this.trigger('click');
        },

        // 输入验证码
        onInputVCode: function() {
            var $vcode = this.$el.find('.u-vcode');
            this.checkState($vcode);
            this.trigger('input', $vcode.val());
        },

        // 清空验证码
        clear: function() {
            var $vcode = this.$el.find('.u-vcode');
            $vcode.val('');
            $vcode.focus();

            this.checkState($vcode);
            this.trigger('input', '');
        },

        // 判断是否需要显示清除按钮
        checkState: function($vcode) {
            var $clear = this.$el.find('.u-cleararea');

            if ($vcode.val() == '') {
                $clear.addClass('f-hide');
            } else {
                $clear.removeClass('f-hide');
            }
        },

        countdown: function(sec) {
            // 正在倒计时时，不需要操作
            if (this.timer) return;

            var $button = this.$el.find('.u-countdown'),
                start   = new Date,
                remain  = null;

            sec = sec || COUNTDOWN_START;

            $button.prop('disabled', true);

            this.timer = setInterval(function() {
                remain = sec - (new Date - start) / 1000;

                if (remain >= 0) {
                    $button.text('00:' + ('0' + ~~remain).slice(-2));
                } else {
                    $button = null;
                    this.stopCountdown(LABEL_AGAIN);
                }

            }.bind(this), COUNTDOWN_UPDATE)
        },

        // 停止倒计时，设置按钮的文本
        stopCountdown: function(label) {
            label = label || LABEL_AGAIN;
            
            var $button = this.$el.find('.u-countdown');

            clearInterval(this.timer);

            this.timer = null;
            $button.text(label);
            $button.prop('disabled', false);

            if (this.options.helpNumber) this.$el.find('.u-codehelp').addClass('active');
        },

        // 禁用发送验证码按钮
        disable: function() {
            var $button = this.$el.find('.u-countdown');
            $button.prop('disabled', true);
        },

        // 激活发送验证码按钮
        enable: function() {
            var $button = this.$el.find('.u-countdown');
            $button.prop('disabled', false);
        }
    })
});