<?php
//pdo:PHP数据对象——PHP数据接口
#写法一
#$dsn='mysql:dbname=mydatabase;host=localhost';
#$myPDO=new PDO($dsn,'root','');

#写法二
	$hostname = "localhost";
    $dbname = "mydatabase";
    $username = "root";
    $pw = "";
    $myPDO = new PDO ("mysql:host=$hostname;dbname=$dbname","$username","$pw");

$sql="INSERT INTO guests(guestid,fname,lname,comments) VALUES(2,'$_POST[fname]','$_POST[lname]','$_POST[comments]')"; //插入时字段必须完整，否则无法执行
$result=$myPDO->query($sql);
if ($result!=false) {
	echo "OK";
} else{
	echo "ERROR";
}
/*
$sql="SELECT * FROM guests ORDER BY lname,fname";
$result=$myPDO->query($sql);
while ($row=$result->fetch(PDO::FETCH_ASSOC)) {
 	echo $row['fname'].' '.$row['lname'];
 	echo " speaking:".substr($row['comments'],0,150);
 	echo "<br />";
 }
 */ 
?>