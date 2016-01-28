/**
 * 占据整个宽度的按钮
 *
 * var button = new PrimaryButton({text: '立即开通'});
 *
 * button.on('click', function() {})
 *
 * button.disable(text)
 * button.enable(text)
 * 
 */
define([
    '{lib}base/global.js'
], function() {
    var _ui = NEJ.P('music.mobile.ui');

    var PrimaryButton = _ui.PrimaryButton = Backbone.View.extend({
        tagName: 'button',
        className: 'u-btn u-btn-block',
        events: {
            'click': 'onClick'
        },
        /**
         * cssClass 自定义样式
         * text     按钮文本
         * disabled 是否禁用
         */
        initialize: function(options) {
            options             = options || {};
            options.cssClass    = options.cssClass || 's-primary';
            options.text        = options.text || '确定';
            options.disabled    = options.disabled || false;

            this.options = options;
        },
        render: function() {
            this.$el.addClass(this.options.cssClass);
            this.$el.text(this.options.text);
            if (this.options.disabled) this.disable();
            return this;
        },
        onClick: function() {
            this.trigger('click');
        },
        // 置灰按钮，并修改文本
        disable: function(text) {
            this.$el.prop('disabled', true);
            if (text) this.$el.text(text);
        },
        // 激活按钮，并修改文本
        enable: function(text) {
            this.$el.prop('disabled', false);
            if (text) this.$el.text(text);
        }
    });
});