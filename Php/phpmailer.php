<?php
//PHPMailer实现邮件发送
require("source/PHPMailer/class.phpmailer.php");
$mail=new PHPMailer();
//设置使用SMTP
$mail->IsSMTP();
//指定主服务器和辅服务器
$mail->HOST="smtp1.example.com;smtp2.example.com";
//打开SMTP认证选项
$mail->SMTPAuth=true;
//SMTP用户名
$mail->Username="duhao";
$mail->Password="sb";
$mail->From="jzwmxz@iminyao.com";
$mail->FromName="Mailer";

//收件人及回件地址，名字是可选的
$mail->AddAddress("jzwmxz@hotmail.com","Li Nan");
$mail->AddReplyTo("info@example.com","Information");

//设置换行字符为50个
$mail->WordWrap=50;
//添加一个附件
$mail->AddAttachment("/file.txt");
//设置邮件格式为HTML
$mail->IsHTML(true);
$mail->Subject="subject";
$mail->Body="here <b>body</b>";
$mail->AltBody="纯文本";
if (!$mail->Send()) {
	echo "未发送.<p>";
	echo "错误：".$mail->ErrorInfo;
} else{
	echo "OK";
}
?>