<?php

include("./connection/connection.php");
$temp = include("./connection/connection.php");
echo($temp);
$sql="SELECT count(id) as totalCount from bussinessList ";
$result =  mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$totalBusinessList = $row["totalCount"];
echo("<br>");
echo( $conn );

echo("<h3>Total Business Enrolled => $totalBusinessList </h3>");

$sql="SELECT count(id) as totalCount from imageServer ";
$result =  mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$totalImageServer = $row["totalCount"];

echo("<h3>Total Business Images => $totalImageServer </h3>");

?>