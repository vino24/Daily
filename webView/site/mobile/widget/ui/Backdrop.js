/**
 * music.mobile.ui.Backdrop 半透明的遮挡层，单例
 * Backdrop.show()
 * Backdrop.hide()
 */
define([
    '{lib}base/global.js',
    '{pro}widget/util/extend.js',
    '{pro}widget/util/rAF.js'
], function() {
    'use strict';

    var _ui = NEJ.P('music.mobile.ui'),
        _ut = NEJ.P('music.mobile.util');

    var _rAF = _ut.requestAnimationFrame;

    var _instance = null;

    var Backdrop = _ui.Backdrop = Backbone.View.extend({
        className: 'backdrop-container',
        render: function() {
            // console.log(document.height);
            // ios：弹出键盘后会无视 position:fixed; 导致遮罩无法全屏，用 position:absolute hack
            var height = document.height || document.body.scrollHeight;
            if (height) {
                this.$el.css({position: 'absolute', height: height});
            }

            this.$el.html('<div class="backdrop"></div>');
            $('body').append(this.$el);
            this.$el.addClass('active');
            _rAF();
            return this;
        },
        hide: function() {
            if (this.timer) return;

            this.$el.removeClass('active');
            this.timer = setTimeout(function() {
                this.$el.remove();
                this.remove();
                this.timer = null;
                _instance = null;
            }.bind(this), 250);
        }
    }, {
        show: function() {
            if (!_instance) {
                _instance = new Backdrop();
                _instance.render();
            } else if (_instance.timer) {
                clearTimeout(_instance.timer);
                _instance.$el.addClass('active');
                _instance.timer = null;
            }
            return _instance;
        },
        hide: function() {
            _instance && _instance.hide();
        }
    });
 });