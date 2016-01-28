<#escape x as x?html>
<#include "../const.ftl"/>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
    <title>电信4G免费流量包-网易云音乐</title>
    <!-- @STYLE -->
    <link rel="stylesheet" type="text/css" href="${pro_root}css/base.css">
    <link rel="stylesheet" type="text/css" href="${pro_root}css/uicommon.css">
    <link rel="stylesheet" type="text/css" href="${pro_root}css/flow.css">
</head>
<body>
    <div class="g-mn">
        <div id="view" class="g-bd"></div>
    </div>

    <#include "./template.ftl">

    <script type="text/javascript">
    var MODEL = {
        shareid:          '${shareid!""}',
        cellphone:        '${cellphone!""}',
        // 参与人数、红包总数、分享者头像
        participateCount: '${participateCount!"0"}',
        total:            '${total!"0"}'
    };
    </script>

    <script type="text/javascript" src="${app_root}lib/zepto/zepto.js"></script>
    <script type="text/javascript" src="${app_root}lib/underscore/underscore.js"></script>
    <script type="text/javascript" src="${app_root}lib/backbone/backbone.js"></script>

    <!-- @DEFINE{core:false} -->
    <script type="text/javascript" src="${lib_root}nej/src/define.js?app=${app_root}&pro=${pro_root}"></script>
    <script type="text/javascript" src="${pro_root}module/flow/index.js"></script>
</body>
</html>
</#escape>