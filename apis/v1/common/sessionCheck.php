<?php
    $sessionfor="atlasDashboard";
    if( $_SESSION[$sessionfor]["username"] != "")
    {

        if( (strtotime(date("Y-m-d H:i:s")) - $_SESSION[$sessionfor]["logintime"]) < $_SESSION[$sessionfor]["sessiontime"] )
        {
            $_SESSION[$sessionfor]["logintime"] = strtotime(date("Y-m-d H:i:s"));

        }else{
            $response["msg"] = "Session is Idle.. Please Login";
            echo json_encode($response);
            exit(0);
        }

    }else{
        $response["msg"] = "Session Failed.. Please Login";
        echo json_encode($response);
        exit(0);
    }

    $conn = $_SESSION[$sessionfor]["conn"];
    $link = $_SESSION[$sessionfor]["protocol"];

    $link="http";
    $rootfolder= $_SERVER['DOCUMENT_ROOT']; 
    include($rootfolder."/connection/connect.php"); 

    $currentUser = $_SESSION[$sessionfor]["userName"];
?>