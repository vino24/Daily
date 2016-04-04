<?php
/**
* 字符串匹配 preg_match()
*/
/*
$phone="903-543-5454";
$pattern="/^[2-9]{1}[0-9]{2}-[0-9]{3}-[0-9]{4}$/";
echo preg_match($pattern, $phone);
*/
/**
* 字符串替换 preg_replace()
*/
/*
$phone="903-543-5454";
$look_for=array("/4/","/-/");
$replace_with=array("7","*");
echo preg_replace($look_for,$replace_with,$phone);
*/
/**
* 字符串分割 preg_split()
*/
$pattern="#[+*/-]#";
$formula="36+15/5*12";
$operands=preg_split($pattern,$formula);
var_dump($operands);
?>