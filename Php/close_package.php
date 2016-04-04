<?php
/**
*闭包 常用于以回调函数遍历数组和利用一个函数逐一处理数组中的每一个元素
*/
$penson=function($value,$key){
	echo $key.":".$value."<br />";
};
$arr=array('name'=>'Du Hao','age'=>'18');
array_walk($arr, $penson);
?>