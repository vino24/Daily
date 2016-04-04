<?php
//动态生成问卷表单，由file.php跳转来
session_start();
$folder=$SESSION['folder'];
$filename=$folder."/question.txt";
//打开文件
//读取文件所有内容
$file_handle=fopen($filename,"a+");
$comments=fread($file_handle,filesize($filename));
fclose($file_handle);
if ($_POST['posted']) {
	//第一次需要建立文件，并将内容保存起来
	$question1=$_POST['question1'];
	$file_handle=fopen($filename,"w+");
	//完全改写打开的文件
	if (flock($file_handle,LOCK_EX)) {
		//设置一个排他锁
		if (fwrite($file_handle,$question1)==false) {
			echo "不能写入文件".$filename;
		}
		flock($file_handle,LOCK_UN);
		//释放锁
	}
	//关闭文件句柄并重定向到下一页
	fclose($file_handle);
	header("Location:file_header_toto.php");
} else{
?>
<html>
<head>
	<title>Online Survey</title>
</head>
<body>
<table border="0"><tr><td>
	Plese enter your question:
</td></tr>
<tr bgcolor="lightblue"><td>
	What is opinion?<br/>
	Can you help me?
</td></tr>
<tr><td>
	<form action="?=$PHP_SELF ?>" method=POST>
	<input type='hidden' name="posted" value=1 /><br />
	<textarea name="question1" rows=12 cols="35"><?=$comments ?></textarea>
</td></tr>
<tr><td>
	<input type="submit" name="submit" value="Submit">
</form></td></tr>
</table>
</body>
</html>
<?php } ?>
