<?php

include('../common/index.php');
parse_str(file_get_contents("php://input"), $post_vars);
$tableName = "users";
$uniqueKey = "userId";
$uniqueValue = $_POST[$uniqueKey];
if($_POST["whereClause"] != "")
{
    $whereClause = " WHERE " . $_POST["whereClause"];
}
$colsForTableView = " `id`, `userId`, concat(`firstName`, `lastName`) as fullName,`contactNumber1`,`mailId`,`designation`,`status` ";
$colsAllView = " `id`, `userId`, `password`, `firstName`, `lastName`, `mailId`, `contactNumber1`, `contactNumber2`, `dateOfBirth`, `designation`, `salary`, `address`, `groupId`, `rights`, `notes`, `tiktok`, `geoLatitude`, `geoLongitude`, `status` ";


include('../operation/index.php');

include('../operation/action.php');
?>
