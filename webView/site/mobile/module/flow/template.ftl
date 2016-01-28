<#-- 活动入口 -->
<script type="text/template" id="intro-tpl">
    <%if (cellphone) {%>
    <div class="m-user">
        <%if (avatarUrl) {%>
        <img class="head" src="<%=avatarUrl%>?param=180y180">
        <%}%>
        <%=cellphone%> &nbsp; 送你一个月免费流量包！
    </div>
    <%}%>
    <h1 class="s-bg1 f-pr f-tid">
        <img class="ph" src="/telecomflow/site/mobile/img/index/title_2x.png" />
    </h1>
    <div class="hongbao f-pr s-bg2">
        <img class="ph" src="/telecomflow/site/mobile/img/index/hongbao_2x.png" />
        <a class="btn f-tid f-pa" href="javascript:;" data-action="open">我要抢红包</a>
    </div>
    <div class="share s-bgc1">
        <p class="note">已有<%=participateCount%>人抢过了！共100万个，先到先得！</p>
        <div class="btn f-pr">
            <img class="ph" src="/telecomflow/site/mobile/img/index/btn_share_2x.png">
            <a class="f-tid f-pa" href="javascript:;" data-action="share">分享给其他小伙伴</a>
        </div>
    </div>
    <div id="ui-snote" class="cnt s-bgc1"></div>
</script>

<#-- 开通页 -->
<script type="text/template" id="open-tpl">
    <h1 class="s-bg1 f-pr f-tid">
        <img class="ph" src="/telecomflow/site/mobile/img/index/title_2x.png" />
    </h1>
    <div class="open">
        <div class="inputbox f-pr">
            <img class="ph" src="/telecomflow/site/mobile/img/index/input_box_2x.png">
            <div class="itm f-pa">
                <input type="text" class="phone f-fl" placeholder="请输入手机号" value="12345678911">
                <a href="javascript:;" class="code f-fr" data-action="send">获取验证码</a>
            </div>
            <div class="itm itm-code f-pa">
                <input type="text" class="captcha f-fl" placeholder="请输入验证码" value="1">
            </div>
        </div>
        <div class="get f-pr">
            <img class="ph" src="/telecomflow/site/mobile/img/index/btn_get_2x.png">
            <a class="btn f-tid f-pa" data-action="open">立即领取</a>
        </div>
        <div class="shareto f-pr">
            <img class="ph" src="/telecomflow/site/mobile/img/index/btn_share2_2x.png">
            <a class="btn f-tid f-pa" data-action="share">分享给其他小伙伴</a>
        </div>
        <div class="cloud s-bgc1"><img class="ph" src="/telecomflow/site/mobile/img/index/cloud_2x.png"></div>
    </div>
    <div id="ui-snote" class="cnt s-bgc1"></div>
</script>

<#-- 站内领取成功、站外领取成功、已领取过 -->
<script type="text/template" id="success-tpl">
    <%if (valid) {%>
        <div class="lucky" ></div>
        <h2>红包领取成功！</h2>
    <%} else {%>
        <div class="gift" ></div>
        <h2>已领取过红包</h2>
    <%}%>
    <p class="tip1">现在开始，在网易云音乐免流量听歌！</p>
    <p class="tip2">用该手机号注册网易云音乐，活动结束后返还话费！</p>
    <a class="u-redbtn dl <%=inapp ? 'f-hide' : ''%>" href="javascript:;" data-action="download">下载网易云音乐</a>
    <a class="u-redbtn" href="javascript:;" data-action="share">呼吁好友，12个月红包等着你~</a>
    <p class="tip3">每3位好友成功领取你的红包，再得一个月！</p>
    <div class="u-activelink">
        <a href="#" data-action="activetip">如何激活？</a>
    </div>
    <div id="ui-snote"></div>
    <div id="ui-prize"></div>
</script>

<#-- 服务说明 -->
<script type="text/template" id="snote-tpl">
    <div class="u-title">
        <h4><%=title%></h4>
    </div>
    <ol class="list">
        <%_.forEach(notes, function(note, index) {%>
            <%if (!fold || index < 2) {%>
            <li class="item"><%=(index + 1)%>. <%=note%></li>
            <%}%>
        <%})%>
    </ol>
    <div class="u-more <%=fold ? '' : 'f-hide'%>">
        <a href="javascript:;" data-action="more"><span class="label">更多活动详情</span><span class="u-icn u-icn-arrdown"></span></a>
    </div>
    <footer class="cpr <%=showHelp ? '' : 'f-hide'%>">
        <p>如需更多帮助，请联系客服400-830-8100</p>
        <p>该活动最终解释权属于中国电信爱音乐及网易云音乐</p>
    </footer>
</script>

<#-- 微信分享浮层 -->
<script type="text/template" id="nosupport-tpl">
    <div class="fu"></div>
    <p class="title">邀请好友<br/>即可活的免费流量包</p>
    <p class="subtitle">邀请越多，赠送越多~</p>
</script>

<#-- 我获得的邀请奖励 -->
<script type="text/template" id="prize-tpl">
    <div class="u-title z-light"><h4>我获得的邀请奖励</h4></div>
    <p class="status">
        已成功邀请<span class="friend"><%=friend%></span>位好友，获<strong><span class="month"><%=month%></span>个月</strong>免费流量！
    </p>
    <%if (friend > 0) {%>
    <p>已邀请好友（共<span class="friend"><%=friend%></span>人）</p>
    <ul class="list f-cb">
        <%_.forEach(cellphones, function(cellphone, index) {%>
        <li class="item"><%=cellphone%></li>
        <%})%>
    </ul>
    <div class="u-more <%=(friend > cellphones.length) ? '' : 'f-hide'%>">
        <a href="#" data-action="all">查看全部<span class="u-icn u-icn-arrdown"></span></a>
    </div>
    <%}%>
    <div class="u-btmlink z-show">呼吁好友，12个月红包等着你~</div>
</script>