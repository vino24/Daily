define([
    '{pro}module/flow/request.js'
], function() {
    'use strict';

    var _widget = NEJ.P('app.widget'),
        _ui     = NEJ.P('music.mobile.ui'),
        _ut     = NEJ.P('music.mobile.util'),
        _data   = NEJ.P('app.data');

    _widget._$$ServiceNote = Backbone.View.extend({
        template: _.template($('#snote-tpl').html()),
        className: 'm-snote',
        /**
         * 配置项
         * extraClassName:   z-light 表示用于浅色背景
         * title:       标题，比如“活动说明”
         * notes:       条款列表
         * fold:        true | false 表示是否将多余两条的内容收缩
         * showHelp:    true | false 表示是否显示客服信息
         */
        initialize: function(_options) {
            _options = _options || {};
            this.__options = _options;

            this.__isFold = !!_options.fold;
        },

        events: {
            'click': '__onClick'
        },

        __fold: function() {

        },

        __unfold: function() {

        },

        render: function() {
            var _options = this.__options;

            this.$el.html(this.template(_options));

            if (_options.extraClassName) {
                this.$el.addClass(_options.extraClassName)
            }

            return this;
        },

        __onClick: function(_event) {
            var _target = $(_event.target),
                _action = _target.data('action');

            if (!_action) return;

            switch (_action) {
                // 展开/收起
                case 'more':
                    if (this.__isFold) {
                        this.__fold();
                    } else {
                        this.__unfold();
                    }
                    break;
            }
        }
    });

    // 站外分享浮层
    _widget._$$NoSupport = Backbone.View.extend({
        template: _.template($('#nosupport-tpl').html()),
        className: 'm-nosupport',
        events: {
            'click': '__hide'
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        __show: function() {
            $(document.body).append(this.render().$el);
        },
        __hide: function() {
            // this.$el.remove();
            this.remove();
        }
    });

    // 我获得的邀请奖励
    _widget._$$Prize = Backbone.View.extend({
        template: _.template($('#prize-tpl').html()),
        className: 'm-prize',
        /**
         * 配置项
         * friend: 好友总数
         * month:  免费月数
         * cellphones: ['xxx'] 好友列表
         */
        initialize: function(_options) {
            _options = _options || {};
            _options.friend = _options.friend || 0;
            _options.month = _options.month || 0;
            _options.cellphones = _options.cellphones || [];
            this.__options = _options;

            $(document.body).on('scroll', _.bind(this.__reposition, this));
            $(document.body).on('touchmove', _.bind(this.__reposition, this));
        },

        events: {
            'click': '__onClick'
        },

        // 重新定位分享按钮 
        __reposition: function() {

        },

        render: function() {
            this.$el.html(this.template(this.__options));
            return this;
        },

        __onClick: function(_event) {

        }

    });

});