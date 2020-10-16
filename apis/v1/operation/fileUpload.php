<?php
/****** Pre -requisites */
/*
$target_dir = "uploads/";
$maxSize = 500000 (500KB);
$fileToUpload= "fileToUpload";
$target_file = url+filename;
*/
/****** Pre -requisites */
// $target_file = $target_dir . basename($_FILES[$fileToUpload]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES[$fileToUpload]["tmp_name"]);
  if($check !== false) {
    $response["msg"] =  "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    $response["msg"] =  "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  $response["msg"] =  "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check file size
if ($_FILES[$fileToUpload]["size"] > $maxSize) {
  $response["msg"] =  "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  $response["msg"] =  "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  $response["msg2"] =  "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES[$fileToUpload]["tmp_name"], $target_file)) {
    $response["msg"] =  "The file ". htmlspecialchars( basename( $_FILES[$fileToUpload]["name"])). " has been uploaded.";
  } else {
    $response["msg"] =  "Sorry, there was an error uploading your file.";
  }
}

$response["status"]=$uploadOk;
?>