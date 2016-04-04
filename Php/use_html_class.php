<?php
//利用html table form类动态创建表单网页(部分代码)
require_once('html_class.inc');
$HTMLPage=new html("HOME Page");
$MyTable=new table();
$MyForm=new form();
$webpage=$MyTable->Begin(1,"left","500");
$webpage.=$MyTable->RowOn();
$webpage.=$MyTable->ColumnOn();
$webpage.=$MyForm->Begin();
$webpage.=$MyForm->InputLabel("FirstName","fname",true);
$webpage.=$MyTable->ColumnOff();
$webpage.=$MyTable->ColumnOn(1,"left");
$webpage.=$MyForm->Input("text","fname","",30);
$webpage.=$MyTable->ColumnOff();
$webpage.=$MyTable->RowOff();
$webpage.=$MyForm->form_end();
$webpage.=$MyTable->End();
$webpage.=$HTMLPage->page_end();
echo $webpage;
?>