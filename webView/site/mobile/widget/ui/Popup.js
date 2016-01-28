/*

确认框，“取消”和“确认”按钮，如果template不是HTML字符串，则自动包装为<p>
Popup.confirm({
    title: 'xx',
    template: 'xx',
    okText: 'xx',
    okClass: 'xx',
    cancelText: 'xx',
    cancelClass: 'xx'
})

警告框，“确认”按钮，如果template不是HTML字符串，则自动包装为<p>
Popup.alert({
    title: 'xx',
    template: 'xx',
    okText: 'xx',
    okClass: 'xx'
})

需要传入所有的参数，可以在构造时将template设置为view
Popup.show({
    title: 'xx',
    template: {htmlString | Backbone.View},
    cssClass: 'xx',
    buttons: [
        {text: 'xx', cssClass: 'xx', onclick: function}
    ]
    showClose: {boolean},
    context: {object}
});

popup.on('ok', function(popup) {})
popup.on('cancel', function(popup) {})
popup.on('close', function(popup) {});



*/
define([
    '{lib}base/global.js',
    '{pro}widget/util/extend.js',
    '{pro}widget/util/rAF.js',
    '{pro}widget/ui/Backdrop.js'
], function() {
    var _ui = NEJ.P('music.mobile.ui'),
        _ut = NEJ.P('music.mobile.util');

    var Backdrop = _ui.Backdrop;

    var _rAF = _ut.requestAnimationFrame;

    var _buildHTML = function(model) {
        var h = [];

        h.push('<div class="popup <%=cssClass%>">');
        h.push('<div class="popup-head">');
        h.push('<h3 class="popup-title"><%=title%></h3>');
        h.push('</div>');
        h.push('<div class="popup-body"></div>');
        h.push('<div class="popup-buttons">');
        h.push('<% _.each(buttons, function(button, index) { %>');
        h.push('<button class="u-btn <%=button.cssClass ? button.cssClass : \"s-transparent\"%>" data-index="<%=index%>"><%=button.text%></button>');
        h.push('<% }); %>');
        h.push('</div>');
        h.push('<% if (showClose) { %>');
        h.push('<a class="u-icon u-icon-close"></a>');
        h.push('<% } %>');
        h.push('</div>');

        return _.template(h.join(''))(model);
    };

    var Popup = _ui.Popup = Backbone.View.extend({
        className: 'popup-container',
        events: {
            'click .popup-buttons .u-btn': 'onClickButton',
            'click .u-icon-close': 'close'
        },
        initialize: function(options) {
            options             = options || {};
            options.title       = options.title || '';
            options.template    = options.template || '';
            options.buttons     = options.buttons || [];
            options.showClose   = options.showClose || false;
            options.cssClass    = options.cssClass || '';
            options.context     = options.context || this;

            this.options = options;
        },
        render: function() {
            // 先弹出遮罩
            Backdrop.show();

            this.$el.html(_buildHTML(this.options));
            this.$el.addClass('active');
            this.setBody(this.options.template);

            // 添加到body元素中
            $('body').append(this.$el);
            _rAF();

            $(window).bind('resize.popup', _.bind(this.reposition, this));
            return this;
        },

        // 设置弹窗标题
        setTitle: function(title) {
            this.$el.find('.popup-title').text(title);
        },

        // 设置弹窗内容
        // 如果弹窗的 body 选项是 Backbone.View 就调用它的 render 方法
        setBody: function(body) {
            var $body = this.$el.find('.popup-body');

            // 如果原来的 body 是 Backbone.View，必须调用它的remove方法
            if (this.currentBody && this.currentBody.remove) {
                this.currentBody.remove(); 
            }

            // 判断新的 body 是不是 Backbone.View
            if (body.render) {
                $body.html(body.render().$el);
            } else {
                $body.html(body);
            }

            this.currentBody = body;
        },

        /**
         * 设置按钮的文字和状态，按钮从左至右排，索引从0开始
         * options.text     {String}    按钮文字
         * options.disabled {Boolean}   是否置灰
         * options.onclick  {Function}  按钮回调函数
         */
        setButton: function(index, options) {
            options = options || {};

            var $button = this.$el.find('.popup-buttons .u-btn[data-index="' + index + '"]');

            if (options.text) {
                $button.text(options.text);
            }

            if (typeof options.onclick != 'undefined') {
                this.options.buttons[index].onclick = options.onclick;
            }

            $button.prop('disabled', options.disabled ? true : false);
        },

        // 禁止页面关闭
        disableClose: function() {
            this._disableClose = true;
        },

        // 页面可关闭
        enableClose: function() {
            this._disableClose = false;
        },

        remove: function() {
            // template 为Backbone.View时，不在这里销毁，哪里创建，哪里负责销毁
            $(window).unbind('resize.popup');
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        // 弹出键盘不会触发 reposition, why?
        reposition: function() {
            var $container = this.$el,
                $popup     = $container.find('.popup');

            // console.log('reposition');
            // 弹窗的外边距至少是 25px
            if ($popup.height() + 50 > $(window).height()) {
                $container.addClass('has-keyboard');
            } else {
                $container.removeClass('has-keyboard');
            }
        },

        // 单击按钮
        onClickButton: function(event) {
            var index = $(event.target).data('index'),
                callback = this.options.buttons[index].onclick;

            // 触发回调函数，没有回调函数的则关闭对话框
            if (callback) {
                callback.call(this.options.context, this);
            } else {
                this.close();
            }
        },

        // 关闭弹窗
        close: function() {
            if (this._disableClose) return;

            Backdrop.hide();
            this.$el.addClass('popup-hidden');

            setTimeout(function() {
                this.$el.remove();
                this.remove();
                this.trigger('close');
            }.bind(this), 250);
        }

        // 类方法
    }, {
        show: function(options) {
            return new Popup(options).render();
        },
        alert: function(options) {
            options = options || {};
            options.title = options.title || '';
            options.template = options.template || '';

            if (!/^<[a-z]+.*?>/i.test(options.template)) {
                options.template = '<p class="f-tc f-fz14">' + options.template + '</p>';
            }

            var okText = options.okText || '确定',
                okClass = options.okClass || 'u-btn-block s-primary';

            var _clickOK = function(popup) {
                popup.close();
                popup.trigger('ok', popup);
            };

            return new Popup(_.extend(options, {
                template: options.template,
                buttons:  [{text: okText, cssClass: okClass, onclick: _clickOK}],
            })).render();
        },
        confirm: function(options) {
            options = options || {};
            options.title = options.title || '';
            options.template = options.template || '';

            if (!/^<[a-z]+.*?>/i.test(options.template)) {
                options.template = '<p class="f-tc f-fz14">' + options.template + '</p>';
            }

            var okText = options.okText || '确定',
                okClass = options.okClass || 's-transparent f-fw1',
                cancelText = options.cancelText || '取消',
                cancelClass = options.cancelClass || 's-transparent';

            var _clickCancel = function(popup) {
                popup.close();
                popup.trigger('cancel', popup);
            };

            var _clickOK = function(popup) {
                popup.trigger('ok', popup);
            };

            return new Popup(_.extend(options, {
                template: options.template,
                buttons: [
                    {text: cancelText, cssClass: cancelClass, onclick: _clickCancel},
                    {text: okText, cssClass: okClass, onclick: _clickOK}
                ]
            })).render();
        }
    });
});