/**
Loading.success('text')
Loading.error('text')
Loading.message('text')

events:
on('close')  当Toast消失后触发

*/
define([
    '{lib}base/global.js',
    '{pro}widget/util/extend.js',
    '{pro}widget/util/rAF.js'
], function() {
    var _ut = NEJ.P('music.mobile.util'),
        _ui = NEJ.P('music.mobile.ui');

    var _rAF = _ut.requestAnimationFrame;

    // 修改之后请更新 _buildHTML 方法
    var TOAST_TYPE = {
        SUCCESS:    1, // 成功图标，居中
        ERROR:      2, // 失败图标，居中
        MESSAGE:    3  // 没有图标，显示在屏幕下方
    };

    var DURATION   = 1000,  // toast 持续时间
        _isShowing = false; // toast 是否显示在窗口

    var _buildHTML = function(model) {
        var h = [];

        // 这里的toast类型判断只能使用字面值了，否则需要在模板外加if判断
        h.push('<div class="toast <%=type == 3 ? \"toast-bottom\" : \"\"%>">');
        h.push('<%if (type != 3) {%>')
        h.push('<span class="u-icon <%=type == 1 ? \"u-icon-success\" : \"u-icon-error\"%>"></span>');
        h.push('<%}%>');
        h.push('<h3 class="toast-text"><%=text%></h3>');
        h.push('</div>');

        return _.template(h.join(''))(model);
    };

    var Toast = _ui.Toast = Backbone.View.extend({
        className: 'toast-container',
        initialize: function(options) {
            options = options || {};
            options.type = options.type || TOAST_TYPE.SUCCESS;
            options.text = options.text || '';

            this.options = options;
        },
        render: function() {
            if (_isShowing) return;

            _isShowing = true;
            this.$el.html(_buildHTML(this.options));
            this.$el.addClass('toast-show');

            $('body').append(this.$el);
            _rAF();
            
            setTimeout(function() {
                this.hide();
            }.bind(this), DURATION);

            return this;
        },
        hide: function() {
            this.$el.addClass('toast-hidden');

            setTimeout(function() {
                this.trigger('close');
                this.$el.remove();
                this.remove();
                _isShowing = false;
            }.bind(this), 250);
        },
        reposition: function() {
            // console.log('reposition');
        }
    }, {
        success: function(text) {
            return new Toast({
                type: TOAST_TYPE.SUCCESS,
                text: text
            }).render();
        },
        error: function(text) {
            return new Toast({
                type: TOAST_TYPE.ERROR,
                text: text
            }).render();
        },
        message: function(text) {
            return new Toast({
                type: TOAST_TYPE.MESSAGE,
                text: text
            }).render();
        }
    });
});