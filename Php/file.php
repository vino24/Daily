<?php
/*
文件存取数据
* mkdir() file_exists() fopen() fread() flock() fwrite() filesize() fclose
*/
session_start();
if ($_POST['posted']&&$_POST['email']!='') {
	$folder="answers/".strtolower($_POST['email']);
	//路径信息保存到session
	$_SESSION['folder']=$folder;
	if (!file_exists($folder)) {
		mkdir($folder);
	}
	header("Location:file_header_to.php");
}
else{ ?>
<html>
<head>
	<title>Files&folder</title>
</head>
<body bgcolor="#FFFFFF" text="#000000">
<h2>Survey Form</h2>
<p>Plese Enter your email</p>
<form action="<?= $PHP_SELF ?>" method=POST>
<input type="hidden" name="posted" value=1 />
<p>e-mail address:</p><input type="text" name="email" size="45">
<br/><br/>
<input type="submit" name="submit" value="Submit">
</form>
<?php } ?>
</body>
</html>