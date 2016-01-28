/**
 * 单例，music.mobile.util
 *
 * AudioPlayer.play(id, url)
 * AudioPlayer.stop()
 * AudioPlayer.pause()
 *
 * [Events]
 * play  必须得在 play 方法调用之前监听
 * stop
 * end
 */
define([
    '{lib}base/global.js'
], function() {
    'use strict';

    var _ut = NEJ.P('music.mobile.util');

    var AudioPlayer = _.extend({}, Backbone.Events);

    var _id         = null,  // 音频文件的唯一标识符
        _startTime  = null,  // 开始播放时间
        _endTime    = null,  // 停止播放时间
        _audio      = null;  // HTML Audio 对象

    var MIN_DURING  = 8000;  // 彩铃最少播放时间

    /**
     * 对同一个音频，在播放过程中第二次调用 play 的效果是停止播放
     * 
     */
    AudioPlayer.play = function(id, url) {
        _audio     = document.createElement('audio');
        _audio.addEventListener('ended', _onPlayEnd);
        _audio.addEventListener('error', _onPlayError);

        _id        = id;
        _audio.src = url;
        _startTime = +new Date();

        _audio.play();

        this.trigger('play', _id);

        return this;
    };

    AudioPlayer.stop = function() {
        if (!_audio) return this;

        try {
            _audio.pause();
            _audio.currentTime  = 0;
            
            _audio.removeEventListener('ended', _onPlayEnd);
            _audio.removeEventListener('error', _onPlayError);
            
        } catch (e) {
            // console.log('stop err', e);
        } finally {
            _audio = null;
            this.trigger('stop', _id);
        }

        return this;
    };

    var _onPlayEnd = function() {
        try {
            _audio.removeEventListener('ended', _onPlayEnd);
            _audio.removeEventListener('error', _onPlayError);
        } catch (e) {
            // console.log('play end err', e);
        } finally {
            _endTime = +new Date();
            _audio = null;
            // console.log('end during', _endTime - _startTime);
            // 如果小于最少播放时间，则认为是播放失败
            if (_endTime - _startTime < MIN_DURING) {
                AudioPlayer.trigger('error', _id);
            } else {
                AudioPlayer.trigger('end', _id);
            }
        }
    };

    var _onPlayError = function() {
        try {
            // console.log('play err', _audio.error);
            _audio.removeEventListener('ended', _onPlayEnd);
            _audio.removeEventListener('error', _onPlayError);
        } catch (e) {
            // console.log('play error err', e);
        } finally {
            _endTime = +new Date();
            // console.log('err during', _endTime - _startTime);
            _audio = null;
            AudioPlayer.trigger('error', _id);
        }
    }

    _ut.AudioPlayer = AudioPlayer;
});