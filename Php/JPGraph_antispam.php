<?php
/**
*生成图片验证码
*/
require("source/jpgraph/src/jpgraph_antispam.php");
$spam=new AntiSpam();
$chars=$spam->Rand(18);
$spam->Stroke();
?>