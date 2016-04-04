<?php
/*
从$_POST数组中取数据保存到数据库中
$mydb=new mysqli('localhost','root','','mydatabase');
$sql="INSERT INTO guests(fname,lname,comments) VALUES('$_POST[fname]','$_POST[lname]','$_POST[comments]')"; //执行多条语句函数multi_query（）
if($mydb->query($sql)==TRUE){
	echo "OK";
} else{
	echo "ERROR";
}
$mydb->close();
*/

//从数据库取得数据并显示
$mydb=new mysqli('localhost','root','','mydatabase');
$sql="SELECT * FROM guests ORDER BY lname,fname";
$result=$mydb->query($sql);
while($row=$result->fetch_assoc()){ //fetch_assoc()一次提取一行数据
	echo $row['fname']." ".$row['lname'];
	echo " talking: ".substr($row['comments'],0,150);
	echo "<br/>";
}
$result->close();
$mydb->close();