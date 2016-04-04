<?php
//PDO预处理对象
$sdn='mysql:dbname=mydatabase;host=localhost';
$myPDO=new PDO($sdn,'root','');
#$statement=$myPDO->prepare('SELECT * FROM Guests ORDER BY ?'); //?做占位符
$statement=$myPDO->prepare('SELECT * FROM Guests ORDER BY :ordervalue'); //名称做占位符
$statement->execute(array('ordervalue'=>'lname'));
echo "order by lname<br/>";
while ($raw=$statement->fetch(PDO::FETCH_ASSOC)) {
	echo $raw['fname'].' '.$raw['lname'];
	echo "Comment:".substr($raw['comments'],0,150);
	echo "<br/>";
}
?>