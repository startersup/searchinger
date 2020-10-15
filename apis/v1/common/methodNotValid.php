

<?php

session_start();
$response["status"]=false;
$sessionfor="atlasDashboard";
$requestMethod = $_SERVER['REQUEST_METHOD'];
$prev_url = $_SERVER['HTTP_REFERER'];
$host = $_SERVER['HTTP_HOST'];

if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') 
$link = "https"; 
else
$link = "http"; 
if($_SERVER['HTTP_HOST'] == "localhost")
{
  $path=$link."://". $_SERVER['HTTP_HOST']."/sm-software/";
}
else{
  $path=$link."://". $_SERVER['HTTP_HOST']."/";
}


date_default_timezone_set('Europe/London');

$rootfolder= $_SERVER['DOCUMENT_ROOT'];
$response["rootfolder"]=$rootfolder; 
$response["Connfolder"]=$rootfolder."/connection/connection.php";
include($rootfolder."/connection/connection.php"); 
if($conn)
{
  $response["conn"]="Conn Pass";
}else
{
  $response["conn"]="Conn failed";
}


// if ($requestMethod == 'GET') {
//     $response["msg"] = "Method Not Valid";
//     echo json_encode($response);
//     exit(0);
// }


// if (! (strpos($prev_url, $host)) )
// {
//     $response["msg"] = "UnAuthorized Access";
//     echo json_encode($response);
//     exit(0);
// }

?>
