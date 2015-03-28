<?php
header("Content-Type:text/event-stream");
header("Cache-Control:no-cache");

do{
	$currentTime=date("h:i:s",time());
	echo "data:".$currentTime.PHP_EOL;
	echo PHP_EOL;
	flush();
	sleep(2);
} while(true);
?>