/*
var phoneInput = new PhoneInput({
    placeholder: 'xxx', // 默认为空
    phone: 'xx'         // 预填电话，默认为空
});

$('#parent').append(phoneInput);

[方法]
phoneInput.clear()
phoneInput.setPhone('xxx')
phoneInput.focus()

[事件]

手机号发生变化时触发
phoneInput.on('change', function(phone) {});

*/
define([
    '{lib}base/global.js'
], function() {
    var _ui = NEJ.P('music.mobile.ui');

    var _buildHTML = function(model) {
        var h = [];

        h.push('<label>+86</label>');
        h.push('<input class="u-input" type="tel" placeholder="<%=placeholder%>" value="<%=phone%>"/>');
        h.push('<a href="javascript:;" class="u-cleararea <%=phone ? \"\" : \"f-hide\"%>"><span class="u-icon u-icon-clear"></span></a>');

        return _.template(h.join(''))(model);
    };

    var PhoneInput = _ui.PhoneInput = Backbone.View.extend({
        className: 'phone-input',
        events: {
            'input .u-input':       'onInput',
            'click .u-cleararea':   'clear'
        },
        initialize: function(options) {
            options             = options || {};
            options.placeholder = options.placeholder || '';
            options.phone       = options.phone || '';

            this.options = options;
        },
        render: function() {
            this.$el.html(_buildHTML(this.options));
            return this;
        },
        // 用户输入手机号
        onInput: function() {
            var $input = this.$el.find('.u-input');
                
            this.checkState($input);
            this.trigger('change', $input.val());
        },
        // 返回手机号
        getPhone: function() {
            var $input = this.$el.find('.u-input');
            if ($input) return $input.val();
            return '';
        },
        // 设置手机号
        setPhone: function(phone) {
            var $input = this.$el.find('.u-input');
            $input.val(phone);
            this.checkState($input);
            this.trigger('change', $input.val());
        },
        // 设置是否出现清除按钮
        checkState: function($input) {
            var $clear = this.$el.find('.u-cleararea');

            if ($input.val() == '') {
                $clear.addClass('f-hide');
            } else {
                $clear.removeClass('f-hide');
            }
        },
        // 清除手机号
        clear: function() {
            var $input = this.$el.find('.u-input');
            $input.val('');
            $input.focus();

            this.checkState($input);
            this.trigger('change', '');
        },
        focus: function() {
            this.$el.find('.u-input').focus();
        }
    });
});