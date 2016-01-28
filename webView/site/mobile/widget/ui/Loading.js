/*
单例
Loading.page('正在加载...')  // 页面过渡，文字可选
Loading.show('退订中...')    // 操作等待，文字可选
Loading.hide()
*/
define([
    '{lib}base/global.js',
    '{pro}widget/util/rAF.js'
], function() {
    var _ui = NEJ.P('music.mobile.ui'),
        _ut = NEJ.P('music.mobile.util');

    var _rAF = _ut.requestAnimationFrame;

    var LOADING_TYPE = {
        PAGE:   1, // 页面过渡，空白页面
        CENTER: 2  // 操作等待，居中转菊花
    };

    var _buildHTML = function(model) {
        var h = [];

        h.push('<div class="loading-body loading-body<%=type%>">');
        h.push('<div class="loading-spin"></div>');
        h.push('<%if (text) {%>')
        h.push('<p class="loading-text"><%=text%></p>');
        h.push('<%}%>');
        h.push('</div>');

        return _.template(h.join(''))(model);
    };

    var _instance  = null,
        _isShowing = false;

    var Loading = _ui.Loading = Backbone.View.extend({
        className: 'loading-container',
        initialize: function(options) {
            options = options || {};
            options.text = options.text || '',
            options.type = options.type || LOADING_TYPE.CENTER;

            this.options = options;
        },
        render: function() {
            if (_isShowing) return;

            this.$el.html(_buildHTML(this.options));

            if (this.options.type == LOADING_TYPE.PAGE) {
                this.$el.addClass('u-white');
                $('body').append(this.$el);
            }

            if (this.options.type == LOADING_TYPE.CENTER) {
                _isShowing = true;
                $('body').append(this.$el);
            }

            return this;
        },
        hide: function() {
            this.$el.remove();
            this.remove();
            _isShowing = false;
        }
    }, {
        page: function(text) {
            if (_instance) return _instance;

            _instance = new Loading({
                type: LOADING_TYPE.PAGE,
                text: text
            }).render();

            return _instance;
        },
        show: function(text) {
            if (_instance) return _instance;

            _instance = new Loading({
                type: LOADING_TYPE.CENTER,
                text: text
            }).render();

            return _instance;
        },
        hide: function() {
            if (!_instance) return;

            _instance.hide();
            _instance = null;
        }
    });
});