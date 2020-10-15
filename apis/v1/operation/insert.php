<?php


/* Insert the records  */
// if ($operationRequest == 'create') {
    $sql = "INSERT INTO `" . $tableName . "` ";
    $sqlCols = "( `toberepcust` ";
    $sqlVals = "( `toberepcust` ";
    foreach ($_POST["data"] as $param_name => $param_val) {
        // echo "Param: $param_name; Value: $param_val<br />\n";
        if (!(strpos($checkParams, $param_name))) {
            $sqlCols .= ", `" . $param_name . "` ";
            $sqlVals .= ", '" . $param_val . "' ";
        }
    }
    $sqlCols = str_replace("`toberepcust` ,", "", $sqlCols);
    $sqlVals = str_replace("`toberepcust` ,", "", $sqlVals);
    $sql .= $sqlCols . ") VALUES " . $sqlVals . ")";
    $response["sql"]=$sql;
    $result =  mysqli_query($conn, $sql);
    if ($result) {
        $last_id = $conn->insert_id;
        $update_id=$last_id;
        $last_id = $last_id+1000;
        include('../common/setUniqueId.php');

        $sql2 = "UPDATE `" . $tableName . "` SET `" . $uniqueKey . "` = '" . $unique_prefix . $last_id . "' where `id` = " .$update_id;
        $response["sql2"]=$sql2;
        $result =  mysqli_query($conn, $sql2);

        $response["status"]=true;
        $response["msg"]="Successfully Inserted.. Newly Inserted id is : ". $unique_prefix . $last_id;
        echo json_encode($response);
        exit(0);

    } else {

        $response["msg"]="Insertion failed";
        echo json_encode($response);
        exit(0);
    }
// }









?>