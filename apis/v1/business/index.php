<?php

// include('../common/index.php');
// parse_str(file_get_contents("php://input"), $post_vars);
// $tableName = "business";
// $uniqueKey = "businessId";
// $uniqueValue = $_POST[$uniqueKey];
// if($_POST["whereClause"] != "")
// {
//     $whereClause = " WHERE " . $_POST["whereClause"];
// }
// $colsForTableView = " `id`, `driverId`, `firstName`,`contactNumber`,`cabType`,`status` ";
// $colsAllView = " `id`, `driverId`, `firstName`, `lastName`, `contactNumber`, `contactNumber2`, `mailId`, `cabType`, `cabModel`, `cabMake`, `cabPlateNumber`, `drivingLicenseNumber`, `address`,`status`, `tiktok` ";


// include('../operation/index.php');

// include('../operation/action.php');

include("./connection/connection.php");
$image=$_POST["image"];
$bussiName=$_POST["bussiName"];
$businessMail=$_POST["businessMail"];
$contactNumber=$_POST["contactNumber"];
$businessCategory=$_POST["businessCategory"];
$businessDescription=$_POST["businessDescription"];
$businessWebsite=$_POST["businessWebsite"];
$businessAddress=$_POST["businessAddress"];
$facebookLink=$_POST["facebookLink"];
$twitterLink=$_POST["twitterLink"];
$googleBusinessLink=$_POST["googleBusinessLink"];


?>
