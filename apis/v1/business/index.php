<?php

include('../common/index.php');
parse_str(file_get_contents("php://input"), $post_vars);
$tableName = "drivers";
$uniqueKey = "driverId";
$uniqueValue = $_POST[$uniqueKey];
if($_POST["whereClause"] != "")
{
    $whereClause = " WHERE " . $_POST["whereClause"];
}
$colsForTableView = " `id`, `driverId`, `firstName`,`contactNumber`,`cabType`,`status` ";
$colsAllView = " `id`, `driverId`, `firstName`, `lastName`, `contactNumber`, `contactNumber2`, `mailId`, `cabType`, `cabModel`, `cabMake`, `cabPlateNumber`, `drivingLicenseNumber`, `address`,`status`, `tiktok` ";


include('../operation/index.php');

include('../operation/action.php');
?>
