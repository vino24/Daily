<?php
//SQLite轻量级数据库
$database=new SQLite3('E:/xampp/htdocs/test/website.sqlite'); //PHP5.3以后改为SQLite3
/*
$sql='CREATE TABLE guests(
	guestid INTEGER PRIMARY KEY,
	fname TEXT,
	lname TEXT,
	comments TEXT)';
$database->exec($sql);
*/
$sql='INSERT INTO guests(fname,lname,comments) '.'VALUES("Li","Nan","Niu!"); '.'INSERT INTO guests(fname,lname,comments) '.'VALUES("Du","Hao","Sb");';
$database->exec($sql);
?>