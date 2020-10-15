<?php

session_destroy();
session_start();

$sessionfor = "atlasDashboard";
$otp = rand(100000, 999999);
$mailId = $_POST["mailId"];
$response["status"] = false;
$createOtp = false;
if ($mailId == "") {
    $response["msg"] = "Mail Id is Empty";
    echo json_encode($response);
    exit(0);
}

$temp = $_SERVER['DOCUMENT_ROOT'];
if ($temp == "C:/xampp/htdocs" || $temp == "/Applications/XAMPP/xamppfiles/htdocs") {
    $temp .= '/sm-software';
}

include($temp . "/connection/connection.php");

$result = mysqli_query($conn, "SELECT userMail,otp,otpFlag from otpTable WHERE `userMail` = '" . $mailId . "' and `otpFlag`='Y' ");
$rowcount = mysqli_num_rows($result);

if ($rowcount == 1) {
    $response["msg"] = "OTP has been alredy sent to your mail Id";
    echo json_encode($response);
    exit(0);
} else if ($rowcount > 1) {
    $createOtp = true;

    $result = mysqli_query($conn, "Update `otpTable` SET `otpFlag` = 'N' WHERE `userMail` = '" . $mailId . "' and `otpFlag`='Y' ");
} else if ($rowcount == 0) {
    $createOtp = true;
}


if ($createOtp) {
    $result = mysqli_query($conn, "INSERT INTO `otpTable`( `userMail`, `otp`, `otpFlag`) VALUES ('$mailId','$otp','Y') ");
    $_SESSION[$sessionfor]["sendOtp"] = $mailId;

    $headers = "";
    $headers .= "From: Atlas Cars <password@app.xendworks.com> \r\n";
    $headers .= "Reply-To: Atlas Cars <password@app.xendworks.com>  \r\n" . "X-Mailer: PHP/" . phpversion();
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\b";

    $subject = "Your nw password request";
    $message =  "Your One Time Password (OTP) is : ".$otp." \n Your OTP will expires in next 10 minutes.";
    $mailResult=mail($mailId,$subject,$message,$headers);
}

mysqli_close($conn);
