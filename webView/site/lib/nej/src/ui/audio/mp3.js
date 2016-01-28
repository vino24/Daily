/**
 *
 * @author: hzlengqing
 *      (hzlengqing@corp.netease.com)
 * @date: 2015/3/9
 */
var f = function(){
    // variable declaration
    var o = NEJ.O,
        _f = NEJ.F,
        _  = NEJ.P,
        _v = _('nej.v'),
        _t = _('nej.ut'),
        _p = _('nej.ui'),
        _e = _('nej.e'),
        _c = _('nej.c'),
        __proAudioPlayer,
        __supAudioPlayer;
    if (!!_p._$$AudioPlayer) return;
    /**
     * 音频播放器
     * @class   {nej.ui._$$AudioPlayer} 音频播放器
     * @uses    {nej.ut._$$MediaAudio}
     * @extends {nej.ui._$$Abstract}
     * @param   {Object}  可选配置参数，已处理参数列表如下：
     * @config  {String}  url       音乐地址
     * @config  {Boolean} autostart 自动开始播放
     *
     * [hr]
     *
     * @event  {onstatechange} 状态变化事件
     * @param  {Object}        事件对象
     *
     */
    _p._$$AudioPlayer = NEJ.C();
    __proAudioPlayer = _p._$$AudioPlayer._$extend(_p._$$Abstract);
    __supAudioPlayer = _p._$$AudioPlayer._$supro;
    /**
     * 初始化外观信息
     * @protected
     * @method {__initXGui}
     * @return {Void}
     */
    __proAudioPlayer.__initXGui = function(){
        this.__seed_css = _seed_css;
        this.__seed_html= _seed_html;
    };
    /**
     * 初始化节点
     * @protected
     * @method {__initNode}
     * @return {Void}
     */
    __proAudioPlayer.__initNode = function(){
        this.__supInitNode();
        // 0 - 播放按钮
        // 1 - 音量
        // 2 - 当前播放时间
        // 3 - 歌曲总时长
        var _list  = _e._$getByClassName(this.__body,'ztag');
        this.__nplay  = _list[0];
        this.__nvol   = _list[1];
        this.__nctime = _list[2];
        this.__nstime = _list[3];

       var  _vlist = _e._$getByClassName(this.__body,'vtag'),
            _tlist = _e._$getByClassName(this.__body,'ttag');

        //设置音量
        this.__vslide = {
            track:_vlist[0],
            thumb:_vlist[2],
            progress:_vlist[1],
            onslidestop:this.__onVolSlideStop._$bind(this)
        };
        //设置播放时间
        this.__tslide = {
            track:_tlist[0],
            thumb:_tlist[2],
            progress:_tlist[1],
            value:0,
            onslidestop:this.__onTimeSlideStop._$bind(this)
        };
        _v._$addEvent(this.__nplay,'click',
            this.__onAction._$bind(this));



    };
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    __proAudioPlayer.__reset = function(_options){
        this.__supReset(_options);
        this.__vslide.value = _options.volnumber||100;
        this.__audio = this.__getAudio(_options.url);
        if (!this.__volSlider){
            this.__volSlider = _t._$$SimpleSlider._$allocate(this.__vslide);
        }


        //this._$play();
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    __proAudioPlayer.__destroy = function(){
        this.__supDestroy();
        if (!!this.__audio)
            this.__audio = this.__audio.constructor
                ._$recycle(this.__audio);
    };
    /**
     * 操作事件
     * @protected
     * @method {__onAction}
     * @return {Void}
     */
    __proAudioPlayer.__onAction = function(){
        _e._$hasClassName(this.__nplay,'m-play')?this._$play():this._$pause();
    };
    /**
     * 返回音频对象
     * @protected
     * @method {__getAudio}
     * @return {Object} 音频对象
     */
    __proAudioPlayer.__getAudio = function(_source){
        return _t._$$MediaAudio._$allocate({url:_source,
            onstatechange:this.__onStateChange._$bind(this),
            ontimeupdate:this.__onTimeUpdate._$bind(this),
            onvolumechange:this.__onVolumeChange._$bind(this)
        });
    };
    /**
     * 音频控件状态变化回调事件
     * @protected
     * @method {__onStateChange}
     * @param {Object} 事件对象
     * @return {Void}
     */
    __proAudioPlayer.__onStateChange = (function(){
        var _state_list = ['m-play','js-loading','m-pause'],
            _state_str  = _state_list.join(' ');
        return function(_event){
            this.__state = _event.state;
            _e._$replaceClassName(this.__nplay,_state_str,
                _state_list[_event.state]||_state_list[0]);
            this._$dispatchEvent('onstatechange',_event);
            if (this.__state == 3){
                this.__onTimeUpdate({current:0,duration:0});
            }
        };
    })();
    /**
     * 播放音乐
     * @method {_$play}
     * @return {nej.ui._$$AudioPlayer}
     */
    __proAudioPlayer._$play = function(){
        if (!!this.__audio)
            this.__audio._$play();
        return this;
    };
    /**
     * 暂停播放
     * @method {_$pause}
     * @return {nej.ui._$$AudioPlayer}
     */
    __proAudioPlayer._$pause = function(){
        if (!!this.__audio)
            this.__audio._$pause();
        return this;
    };
    /**
     * 停止播放
     * @method {_$stop}
     * @return {nej.ui._$$AudioPlayer}
     */
    __proAudioPlayer._$stop = function(){
        if (!!this.__audio)
            this.__audio._$stop();
        return this;
    };

    /**
     * 更新音量大小图标
     * @return {void}
     */
    __proAudioPlayer.__onVolumeChange = (function(){
        var _map = ['m-vmax','m-vmin','m-vzero'],
            _old = _map.join(' ');
        return function(_event){
            this.__volSlider._$setPosition(_event.volume/this.__vslide.value);
            var _value = _event.volume;
            if (_value == 0){
                _value = 2;
            }else if (_value < 50){
                _value = 1;
            }else{
                _value = 0;
            }
            _e._$replaceClassName(this.__nvol,_old,_map[_value]);
        };
    })();
    /**
     * 设置音量
     * @param  {[type]} _event [description]
     * @return {void}
     */
    __proAudioPlayer.__onVolSlideStop = function(_event){
        var _value = _event.ratio;
        _value = _value * this.__vslide.value
        if (!!this.__audio){
            this.__audio._$volume(_value);
        }else{
            this.__onVolumeChange({volume:_value});
        }
    };

    /**
     * 设置播放时间
     * @param  {[type]} _event [description]
     * @return {void}
     */
    __proAudioPlayer.__onTimeSlideStop = function(_event){
        if (!this.__audio._$duration()) return;
        var _value = _event.ratio;
        this.__audio._$seek(_value * this.__audio._$duration());
    };


    /**
     * 更新时间轴
     * @param  {[type]} _event [description]
     * @return {void}
     */
    __proAudioPlayer.__onTimeUpdate = function(_event){
        if (!this.__timeSlider)
            this.__timeSlider = _t._$$SimpleSlider._$allocate(this.__tslide);
        var _current  = _event.current,
            _duration = _event.duration;
        if (parseInt(_current) === 0){
            this.__nctime.innerHTML = '00:00';
            this.__nstime.innerHTML = this.__doFormatSecond(_duration);
        }
        this.__nctime.innerHTML = this.__doFormatSecond(_current);
        var _played = _current / (_duration ? _duration : 1);
        this.__timeSlider._$setPosition(_played);

    };

    /**
     * 格式化秒为小时或分钟
     * @return {String}  格式化好的时间
     */
    __proAudioPlayer.__doFormatSecond = function(_second){
        var _hour = parseInt(_second/3600),
            _min  = parseInt((_second%3600)/60),
            _sec  = parseInt(_second%60);
        _min = _min > 9 ? _min : '0' + _min;
        _sec = _sec > 9 ? _sec : '0' + _sec;
        return (_hour > 0 ?  _hour + ':' : '') + _min + ':' +  _sec;
    };

    /**
     * 设置播放时间
     * @param  {[type]} _event [description]
     * @return {void}
     */
    __proAudioPlayer.__onTimeSlideStop = function(_event){
        if (!this.__audio._$duration()) return;
        var _value = _event.ratio;
        this.__audio._$seek(_value * this.__audio._$duration());
    };





    var _seed_css = _e._$pushCSSText('\
      .#<uispace> .m-pre, .#<uispace> .m-play, .#<uispace> .m-next, .#<uispace> .m-cur, .#<uispace> .m-pause, .#<uispace> .m-volmin,\
      .#<uispace> .m-volminc, .#<uispace> .m-shuffled, .#<uispace> .m-repeatd-1, .#<uispace> .m-shufflec, .#<uispace> .m-repeatd, .#<uispace> .m-repeatc,\
      .#<uispace> .m-volmax, .#<uispace> .m-volmaxc{background:url('+_c._$get('root')+'audio_sprite.png) no-repeat 9999px 9999px;}\
      .#<uispace> .m-player{height:40px;min-width:400px;background:#717171;cursor:default}\
      .#<uispace> .m-player .ctl{width:180px; float:left;position: absolute;}\
      .#<uispace> .m-pre{height:30px;width:25px;background-position:0 0;float:left;margin-top:8px;margin-left: 10px;}\
      .#<uispace> .m-pre:active, .#<uispace> .m-preatv{background-position:-104px -1px;}\
      .#<uispace> .m-play{height:40px;width:32px;background-position:0 -35px;float:left;margin:2px 4px 0;}\
      .#<uispace> .m-play:active{background-position:-202px -36px;}\
      .#<uispace> .m-pause{height:40px;width:32px;background-position:-103px -35px;float:left;margin:2px 4px 0;}\
      .#<uispace> .m-pause:active{background-position:-155px -36px;}\
      .#<uispace> .m-next{height:30px;width:25px;background-position:0 -80px;float:left;margin-top:8px;}\
      .#<uispace> .m-next:active, .#<uispace>  .m-nextatv{background-position:-103px -81px;}\
      .#<uispace> .m-player .loop{width:90px;float:right}\
      .#<uispace> .m-curtime{float: left;margin-right: 5px;color:#fff;line-height: 40px;}\
      .#<uispace> .m-time{float: left;color:#fff;line-height: 40px;}\
      .#<uispace> .m-player .timeline{height:25px;position:absolute;left:200px;right:50px;bottom:0;top:0;width:200px;padding-top:15px;}\
      .#<uispace> .m-vol{height:27px;width:90px;padding:13px 0 0 20px;float:left;}\
      .#<uispace> .m-volicn{width:12px;height:20px;margin:10px 0 0 10px;float:left}\
      .#<uispace> .m-vzero .m-volminc{background-position:1px -185px;width:5px;height:20px;float:left;}\
      .#<uispace> .m-vzero .m-volmaxc{background-position:-8px -185px;width:7px;height:20px;float:left;}\
      .#<uispace> .m-vmin .m-volminc{background-position:-40px -186px;width:5px;height:20px;float:left;}\
      .#<uispace> .m-vmax .m-volminc{background-position:-40px -186px;width:5px;height:20px;float:left;}\
      .#<uispace> .m-vmin .m-volmaxc{background-position:-7px -185px;width:7px;margin-left:-1px;height:20px;float:left;}\
      .#<uispace> .m-vmax .m-volmaxc{background-position:-50px -186px;width:7px;margin-left:-1px;height:20px;float:left;}\
      .#<uispace> .m-timeline{position:absolute;width:100%;height:8px;border-radius:4px;background:#3b3b3b;border-top:1px solid #212121;border-bottom:1px solid #636363}\
      .#<uispace> .m-timelinei{width:0%;}\
      .#<uispace> .m-timeline-1{margin-top:0px;width:90px;position:absolute;}\
      .#<uispace> .m-progress{background:#82CB3A;margin-top:-1px;}\
      .#<uispace> .m-cur{position:absolute;right:-5px;margin-left:-5px;background-position:-73px -186px;height:10px;width:10px;}\
      .#<uispace> .m-cur2{position:absolute;right:-5px;margin-left:-5px;background:url('+_c._$get('root')+'audio_sprite.png) no-repeat 9999px 9999px;width:10px;background-position: -73px -186px;}\
      .#<uispace> .m-cur:active, .#<uispace> .m-cur2:active{background-position:-93px -186px;}\
      .#<uispace> .m-shuffleb{height:20px;width:20px;float:right;margin:10px 10px 0 0 }\
      .#<uispace> .m-shuffled{background-position:-55px -115px;}\
      .#<uispace> .m-shufflec{background-position:-56px -115px;}\
      .#<uispace> .m-repeatb, .m-repeatb-1{height:20px;width:20px;float:right;margin:10px 10px 0 0 }\
      .#<uispace> .m-repeatd{background-position:-55px -149px;}\
      .#<uispace> .m-repeatd-1{background-position:-11px -149px;}\
      .#<uispace> .m-repeatc{background-position:-56px -149px;}\
      .m-cnt{width:500px;position: absolute;left:380px;margin-top:10px;display: inline;}');
    var _seed_html = _e._$addNodeTemplate('\
      <div class="m-cnt '+_seed_css+'">\
        <div class="cse">\
          <div class="m-player">\
            <div class="ctl">\
              <span class="f-ib m-play ztag">&nbsp;</span>\
              <div class="m-vol">\
                <div class="f-ib m-timeline m-timeline-1 vtag">\
                  <div class="f-ib m-timeline m-progress m-timeline-1 vtag">\
                    <span class="f-ib m-cur2 vtag">&nbsp;</span>\
                  </div>\
                </div>\
              </div>\
              <span class="m-volicn ztag m-vmax f-ib">\
                <span class="f-ib m-volminc">&nbsp;</span>\
                <span class="f-ib m-volmaxc">&nbsp;</span>\
              </span>\
            </div>\
            <div class="timeline">\
                <div class="m-timeline ttag">\
                  <div class="m-timeline m-progress ttag m-timelinei">\
                    <span class="m-cur ttag">&nbsp;</span>\
                  </div>\
                </div>\
            </div>\
            <div class="loop">\
              <span class="m-curtime ztag">00:00</span>\
              <span class="m-curtime">/</span>\
              <span class="m-time ztag">00:00</span>\
            </div>\
          </div>\
        </div>\
      </div>');
};



NEJ.define('{lib}ui/audio/mp3.js',
        [   '{lib}ui/base.js',
            '{lib}util/media/audio.js',
            '{lib}util/slider/slider.simple.js'
        ],f);