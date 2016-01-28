define([
    // '{app}lib/zepto/zepto.js',
    // '{app}lib/underscore/underscore.js',
    // '{app}lib/backbone/backbone.js',
    '{pro}widget/ui/Loading.js',
    '{pro}module/flow/request.js',
    '{pro}module/flow/view/intro.js',
    '{pro}module/flow/view/open.js'
], function() {
    var _data = NEJ.P('app.data'),
        _view = NEJ.P('app.view'),
        _ui   = NEJ.P('music.mobile.ui');

    // router 配置
    var AppRouter = Backbone.Router.extend({
        // 切换视图
        __loadView: function(_v) {
          this.__view && this.__view.remove();
          this.__view = _v;
          $('#view').html(this.__view.render().$el);
          // 强制滚动到顶部
          $(window).scrollTop(0);
        },

        // 活动入口
        __introView: function() {
            this.__loadView(new _view._$$IntroView());
        },

        // 开通页面
        __openView: function() {
            this.__loadView(new _view._$$OpenView());
        },

        // 领取成功、已领取过
        __successView: function(_options) {
            this.__loadView(new _view._$$SuccessView(_options));
        }
    });

    _ui.Loading.page();

    var _router = _view.__router = new AppRouter();

    _data._$getStatus(function(_rsp) {
        
        if (_rsp.isOpened) {
            // 已开通
            _router.__successView({
                inapp: _data._$isInApp(),
                valid: false
            });
        } else {
            // 未开通
            _router.__introView();
        }

        _ui.Loading.hide();
    });
}); 