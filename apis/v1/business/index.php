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

include("./connection/connection.php");
$image = $_POST["image"];
$bussiName = $_POST["bussiName"];
$businessMail = $_POST["businessMail"];
$contactNumber = $_POST["contactNumber"];
$businessCategory = $_POST["businessCategory"];
$businessDescription = $_POST["businessDescription"];
$businessWebsite = $_POST["businessWebsite"];
$businessAddress = $_POST["businessAddress"];
$googleReviews = $_POST["googleReviews"];
$facebookLink = $_POST["facebookLink"];
$twitterLink = $_POST["twitterLink"];
$googleBusinessLink = $_POST["googleBusinessLink"];

$sql = "INSERT INTO `bussinessList` ( `businessName`, `businessMail`, `contactNumber`, `businessCategory`, `businessDescription`, `businessWebsite`, `businessAddress`, `facebookLink`, `twitterLink`, `googleBusinessLink`,  `googleReviews`, `overAllReviews`,  `businessAbout`)  VALUES ( '$bussiName', '$businessMail', '$contactNumber', '$businessCategory', '$businessDescription', '$businessWebsite', '$businessAddress', '$facebookLink', '$twitterLink', '$googleBusinessLink', '$googleReviews', '$googleReviews', '')";

$response["sql"] = $sql;

$result =  mysqli_query($conn, $sql);
if ($result) {
    $last_id = $conn->insert_id;

    $target_dir =$rootfolder . "/uploads/businessLogo/";
    $target_file = $rootfolder . "/uploads/businessLogo/Logo_for_" . $last_id;

    $target_file_url = $path."uploads/businessLogo/Logo_for_" . $last_id;

    $maxSize = 300000;
    $fileToUpload = "fileToUpload";

    $target_file_temp = $target_dir . basename($_FILES[$fileToUpload]["name"]);
    $target_file =$target_file.strtolower(pathinfo($target_file_temp,PATHINFO_EXTENSION));
    $target_file_url = $target_file_url .strtolower(pathinfo($target_file_temp,PATHINFO_EXTENSION));
    include('./apis/v1/operation/fileUpload.php');

    if($response["status"] == 0)
    {
        $sql_Delete =" DELETE FROM `bussinessList` WHERE `id` = ".$last_id;
        $response["sql_Delete"] = $sql_Delete;
        $result_delete =  mysqli_query($conn, $sql_Delete);
    }else if($response["status"] ==1)
    {
        $sql_image_Upload = "INSERT INTO `imageServer`( `imageUrl`) VALUES ('$target_file_url')";
        $response["sql_image_Upload"] = $sql_image_Upload;
        $result_image_Upload=  mysqli_query($conn, $sql_image_Upload);

        if($result_image_Upload)
        {
            $image_id = $conn->insert_id;
            $update_image_sql ="UPDATE `bussinessList` SET `logoUrl`='$image_id' WHERE `id` = ".$last_id;
            $response["update_image_sql"] = $update_image_sql;
        $result_image_Update=  mysqli_query($conn, $update_image_sql);
        if($result_image_Update)
        {
            $response["msg"] = "Business Updated Sucessfully";
        }

        }
    }
    
}
else{
    $response["msg"] = "First Insert Fail .... ".$conn;
}
echo json_encode($response);

?>