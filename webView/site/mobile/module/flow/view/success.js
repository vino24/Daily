define([
    '{pro}module/flow/request.js',
    '{pro}module/flow/config.js',
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

    _view._$$SuccessView = Backbone.View.extend({
        template: _.template($('#success-tpl').html()),

        className: 'm-get',

        /**
         * 配置项
         * inapp: true | false 是否在app内
         * valid: true | false 是否可以领取红包
         * prize: {} 初始化邀请列表的数据
         */
        initialize: function(_options) {
            this.__options = _options;

            this.__snote = new _widget._$$ServiceNote({
                extraClassName: 'z-light',
                title:    '话费返还流程',
                notes:    _conf.__NOTES2,
                showHelp: false,
                fold:     true
            });

            this.__prize = new _widget._$$Prize(_options.prize);

            if (_options.inapp && _options.valid) {
                // TODO 刷新免流量状态
            }
        },

        events: {
            'click': '__onClick'
        },

        render: function() {
            this.$el.html(this.template(this.__options));
            this.$el.find('#ui-snote').html(this.__snote.render().$el);
            this.$el.find('#ui-prize').html(this.__prize.render().$el);
            return this;
        },

        __onClick: function(_event) {

        }

    });
});