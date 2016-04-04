<?php
/**
*转义输出
*/
/*
$string="'Fred'&'Duhao'<a href='www.baidu.com'>click me</a>";
echo htmlspecialchars($string);
echo "<br/>";
echo htmlspecialchars($string,ENT_QUOTES);
*/
/**
*数据库转义
*/
/*
$conn=mysql_connect("localhost","root",'');
$db="mydatabase";
mysql_select_db($db,$conn) or die("Could not open $db");
$trusted['lname']=mysql_real_escape_string("O'Mally");
$sql="UPDATE guests SET lname='$trusted[lname]' WHERE guestid=0";
mysql_query($sql);
*/
$string='myPassword';
$salt='peter';
$pepper='MacIntyre';
echo sha1($string);
echo "<br />";
$salt=sha1($salt);
$pepper=sha1($pepper);
$string=$salt.$string.$pepper;
echo sha1($string);
?>