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

$rootfolder = $_SERVER['DOCUMENT_ROOT'];


if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') 
$link = "https"; 
else
$link = "http"; 

$path=$link."://". $_SERVER['HTTP_HOST']."/";

include($rootfolder.'/connection/connection.php');

$search = $_POST["search"];
$sql = "SELECT TOP 10 `post_code` AS name FROM `post_codes` WHERE `search_code` like '".$search."%'";
$result =  mysqli_query($conn, $sql);

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

    $temp[] = $row;
}
if ($temp == null) {
    $temp = array();
}

$response["data"] = $temp;
$response["sql"] = $sql;
echo json_encode($response);
?>