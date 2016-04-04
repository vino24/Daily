<?php
//FPDF库生成PDF
//require("source/FPDF/chinese.php");
require("source/FPDF/fpdf.php");
/*
* 生成有边框且右对齐的PDF页面 width设置为0，取整个页面宽度
*/
/*
$pdf=new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Cell(0,10,'PHP -The Good Parts!',1,1,'R'); //参数分别为 width height(盒子的宽和高，内容可以溢出) text border ln(换行控制) align(文本对齐方式)
$pdf->Output();
*/

/*
* 输出两个在同一行的区块
*/
/*
$fpdf1=new FPDF();
$fpdf1->AddPage();
$fpdf1->SetFont('Arial','B',16);
$fpdf1->Cell(10,10,'PHP - The Good Parts!',0,0,'L');
$fpdf1->SetX(90); //按页面左边界移动光标指定距离
$fpdf1->Cell(80,10,'Hello World',1,0,'C');
$fpdf1->Output();
*/

/*
* 输出两个在同一行的区块
*/
/*
$fpdf1=new FPDF();
$fpdf1->AddPage();
$fpdf1->SetFont('Arial','B',16);
$fpdf1->Cell(10,10,'PHP - The Good Parts!',0,1,'L');
$fpdf1->Cell(80,10,'Hello World',1,0,'C');
$fpdf1->Output();
*/
/*
* FPDF($a,$b,$c) a-页面方向(P-纵向 L-横向) b-度量单位 c-页面大小(A3,A4、A5、Letter(信封)、Legal(公文) array(x,y))
*/
/*
$fpdf1=new FPDF('P','in','Letter'); $fpdf1=new FPDF('L','in',array(4,5));
$fpdf1->AddPage();
$fpdf1->SetFont('Arial','B',16);
$fpdf1->Cell(10,10,'PHP - The Good Parts!',0,1,'L');
$fpdf1->Cell(80,10,'Hello World',1,0,'C');
$fpdf1->Output();
*/

/**
* 添加页眉和页脚
*/
class myPDF extends FPDF
{
	public $title="Header";
	//页眉方法
	function Header()
	{
		$this->SetFont('Times','',12);
		$w=$this->GetStringWidth($this->title)+150;
		$this->SetDrawColor(0,0,180);
		$this->SetFillColor(170,169,148);
		$this->SetTextColor(0,0,255);
		$this->SetlineWidth(1);
		$this->Cell($w,9,$this->title,1,1,'C',1);
		$this->Ln(10);
	}
	//页脚方法
	function Footer(){

		$this->SetY(-15);
		$this->SetFont('Arial','I',8);
		$this->Cell(0,10,'Footer '.$this->PageNo().'/{nb}',0,0,'C');
	}
}
$pdf=new myPDF('P','mm','Letter');
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',24);
$pdf->Cell(0,0,'text at the top of page',0,0,'L');
$pdf->ln(225);
$pdf->Cell(0,0,'text at the top of page',0,0,'C');
$pdf->AddPage();
$pdf->SetFont('Arial','B',15);
$pdf->Cell(0,0,'Top page 2',0,1,'C');
$pdf->Output();
?>