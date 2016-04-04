<?php
require('chinese.php');

$pdf=new PDF_Chinese();
$pdf->AddBig5Font();
$pdf->AddPage();
$pdf->SetFont('Big5','',20);
$pdf->Write(10,'²{®É®ð·Å 18 C Àã«× 83 %');
$pdf->Output();
?>
