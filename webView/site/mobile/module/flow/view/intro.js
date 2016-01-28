define([
    '{pro}module/flow/request.js',
    '{pro}module/flow/config.js',
    '{pro}module/flow/view/widget.js'
], function() {
    'use strict';

    var _widget = NEJ.P('app.widget'),
        _ui     = NEJ.P('music.mobile.ui'),
        _ut     = NEJ.P('music.mobile.util'),
        _conf   = NEJ.P('app.config'),
        _data   = NEJ.P('app.data'),
        _view   = NEJ.P('app.view');

    _view._$$IntroView = Backbone.View.extend({
        template: _.template($('#intro-tpl').html()),
        className: 'n-potral',
        events: {
            'click': '__onClick'
        },
        initialize: function(_options) {
            this.__snote = new _widget._$$ServiceNote({
                title: '活动说明',
                notes: _conf.__NOTES,
                showHelp: true,
                fold: false
            });
        },
        render: function() {
            this.$el.html(this.template({
                cellphone: MODEL.cellphone || '',
                avatarUrl: MODEL.avatarUrl || '',
                participateCount: MODEL.participateCount || '0'
            }));
            this.$el.find('#ui-snote').html(this.__snote.render().$el);
            return this;
        },
        __onClick: function(_event) {
            var _target = $(_event.target),
                _action = _target.data('action');

            if (!_action) return;

            switch (_action) {
                // 抢红包
                case 'open':
                    _view.__router.__openView();
                    break;

                // TODO 分享，不带分享id
                case 'share':

                    break;
            }
        }
    });
});