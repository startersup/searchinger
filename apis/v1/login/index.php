<?php



//include('../common/index.php');

session_start();
$sessionfor="atlasDashboard";
$_SESSION["atlasDashboard"]["login"] = 'N';
date_default_timezone_set('Europe/London');
$temp = $_SERVER['DOCUMENT_ROOT'];
if ($temp == "C:/xampp/htdocs" || $temp == "/Applications/XAMPP/xamppfiles/htdocs") {
    $temp .= '/sm-software';
}
$response["rootpath"]=$temp;
include($temp . "/connection/connection.php");
$response["conn"]=$conn;
        $user = $_POST["userName"];
        $password = $_POST["password"];
        $query = "SELECT `userId`,`password`, concat(`firstName`, `lastName`) as name,`mailId`,`contactNumber1`,`rights` from users WHERE ( userId = '" . $user . "'  or mailId = '" . $user . "' or contactNumber1 = '" . $user . "' ) and status =0 ";
       $response["query"]=$query;
        $result =  mysqli_query($conn, $query);
        $count = mysqli_num_rows($result);
        if ($count > 0) {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
            if ($row["password"] == $password) {
                $_SESSION[$sessionfor]["username"] = $row["userId"];
                $_SESSION[$sessionfor]["name"] = $row["name"];
                $_SESSION[$sessionfor]["mail"] = $row["mailId"];
                $_SESSION[$sessionfor]["rights"] = $row["rights"];
                $_SESSION["atlasDashboard"]["login"] = 'Y';
             /*   $rights = json_decode($output, true);
                
                $query_module = "SELECT `view` from modules ";
                $result_module =  mysqli_query($conn, $query_module);
                while($row_module=mysqli_fetch_array($result_module, MYSQLI_ASSOC))
                {
                    $temp=$row_module["view"];
                    $_SESSION[$sessionfor]["rights"][$temp] = $rights[$temp];
                }
                */
              
                $_SESSION[$sessionfor]["sessiontime"] = 6000;
                $_SESSION[$sessionfor]["logintime"] = strtotime(date("Y-m-d H:i:s"));
              
                $response["status"]=true;
                $response["msg"]="Login Success !!";


            } else {

                $response["status"]=false;
                $response["msg"]="User Name or Password is wrong !!";
               }
        } else {
            
            $response["status"]=false;
            $response["msg"]="User Not Found !!";
               // echo ('<script>alert("User Not Found"); window.location.href ="' . $_SERVER['HTTP_REFERER'] . '"</script>');
        }
   
        echo json_encode($response);
// else{
//     echo ('<script>alert("UnAuthorized Access"); window.location.href ="' . $_SERVER['HTTP_REFERER'] . '"</script>');

// }
