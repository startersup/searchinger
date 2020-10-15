<?php
$sql = "UPDATE `" . $tableName . "` SET ";
$updateData = "( `toberepcust` ";
foreach ($post_vars["data"] as $param_name => $param_val) {
    $updateData .= ", `" . $param_name . "` = '" . $param_val . "' ";
}
$updateData = str_replace("`toberepcust` ,", "", $updateData);
$sql .= $updateData . ") WHERE `" . $uniqueKey . "` ='" . $uniqueValue . "' ";
$result =  mysqli_query($conn, $sql);
$response["sql"] = $sql;
if ($result) {

    $response["status"] = true;
    $response["msg"] = "Successfully Updated for " . $uniqueValue;
    echo json_encode($response);
    exit(0);
} else {

    $response["msg"] = "Updation failed";
    echo json_encode($response);
    exit(0);
}

?>