<?php
//$REQUEST超全局数组 包含$_GET $_POST $COOKIE 键名必须唯一，否则后者会覆盖前者
$fname=$_GET['fname'];
$lname=$_GET['lname'];
echo "the full name from GET:".$fname." ".$lname;
$fname=$_POST['fname'];
$lname=$_POST["lname"];
echo "<br/> the full name from POST:".$fname." ".$lname;
echo "<br/> the Request array->";
var_dump($_REQUEST);
?>
<br/>
<a href="Requst_send.html">back</a>
