<?php

$conn=mysqli_connect('localhost','u775459203_searchinger','?d2PT#6JMJ','u775459203_searchinger');

if( !$conn)
{
    $response["status"]=false;
    $response["msg"]="DB Error...!!!!!";
    echo json_encode($response);
}
?>