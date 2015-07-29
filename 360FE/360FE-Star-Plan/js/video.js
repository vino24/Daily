(function (window, document) {

    var doc = document;

    //  获取要操作的元素
    var video = doc.getElementById("video");
    var videoControls = doc.getElementById("videoControls");
    var videoContainer = doc.getElementById("videoContainer");
    var playBtn = doc.getElementById("playBtn");
    var stopBtn = doc.getElementById("stopBtn");
    var fullScreenBtn = doc.getElementById("fullScreenBtn");
    var progressWrap = doc.getElementById("progressWrap");
    var playProgress = doc.getElementById("playProgress");

    //  创建视频播放器对象
    var videoPlayer = {
        init: function () {
            var that = this;
            bindEvent(video, "loadeddata", videoPlayer.initControls);
            videoPlayer.operateControls();
        },
        initControls: function () {
            videoPlayer.showHideControls();
        },
        showHideControls: function () {
            bindEvent(video, "mouseover", showControls);
            bindEvent(videoControls, "mouseover", showControls);
            bindEvent(video, "mouseout", hideControls);
            bindEvent(videoControls, "mouseout", hideControls);
        },
        operateControls: function () {
            bindEvent(playBtn, "click", play);
            bindEvent(stopBtn, "click", stop);
            bindEvent(video, "click", play);
            bindEvent(fullScreenBtn, "click", fullScreen);
            bindEvent(progressWrap, "mousedown", videoSeek);
            bindEvent(video, "timeupdate", getProgress);
        }
    };

    videoPlayer.init();
    //  事件绑定函数
    function bindEvent(ele, eventName, func) {
        if (window.addEventListener) {
            ele.addEventListener(eventName, func);
        }
        else {
            ele.attachEvent('on' + eventName, func);     // IE
        }
    }

    //  控件显示
    function showControls() {
        videoControls.style.opacity = 1;
    }

    //  控件隐藏
    function hideControls() {
        videoControls.style.opacity = 0;
    }

    //  视频播放/暂停
    function play() {
        if (video.paused || video.ended) {
            if (video.ended) {
                video.currentTime = 0;
            }
            video.play();
            playBtn.innerHTML = "Pause";
        }
        else {
            video.pause();
            playBtn.innerHTML = "Play";
        }
    }

    //  视频停止
    function stop() {
        video.pause();
        video.currentTime = 0;
    }

    //  视频全屏
    function fullScreen() {
        if (video.webkitIsFullScreen) {     //@todo仅支持Chrome浏览器
            video.webkitCancelFullScreen();
        }
        else {
            video.webkitRequestFullscreen();
        }
    }

    //  视频播放条
    function getProgress() {
        playProgress.style.width = (video.currentTime / video.duration * 100) + "%";
        showProgress.innerHTML = (Math.round(video.currentTime * 100) / 100) + "s";
    }

    //  视频播放条点击事件捕获处理
    function videoSeek(e) {
        if (video.paused || video.ended) {
            play();
            enhanceVideoSeek(e);
        }
        else {
            enhanceVideoSeek(e);
        }

    }

    //  更新播放进度
    function enhanceVideoSeek(e) {
        console.log(getElementPositionFixed(progressWrap).x);
        var length = e.pageX - getElementPosition(progressWrap).x;
        var percent = length / progressWrap.offsetWidth;
        video.currentTime = (percent * video.duration);
        console.log(video.currentTime);
        playProgress.style.width = (video.currentTime / video.duration * 100) + "%";
    }

    function getElementPosition(elt) {
        var x = 0, y = 0;
        for (var e = elt; e != null; e = e.offsetParent) {
            x += e.offsetLeft;
            y += e.offsetTop;
        }

        for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
            x -= e.scrollLeft;
            y -= e.scrollTop;
        }
        return {x: x, y: y};
    }

}(this, document))