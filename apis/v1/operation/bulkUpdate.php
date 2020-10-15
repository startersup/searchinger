<?php


/* Bulk Update for the  routes */
//if ($operationRequest == 'bulk_update') {
    $sql = "UPDATE `" . $tableName . "` SET ";
    $updateData = "( `toberepcust` ";
    foreach ($_POST as $param_name => $param_val) {
        // echo "Param: $param_name; Value: $param_val<br />\n";
        if (!(strpos($checkParams, $param_name))) {
            $updateData .= ", `" . $param_name . "` = '" . $param_val . "' ";
        }
    }
    $updateData = str_replace("`toberepcust` ,", "", $updateData);
    $sql .= $updateData . $whereClause;
    $result =  mysqli_query($conn, $sql2);
    if ($result) {
          
        $response["status"]=true;
        $response["msg"]="Successfully Updated..".;
        echo json_encode($response);
        exit(0);

    } else {

        $response["msg"]="Updation failed";
        echo json_encode($response);
        exit(0);
    }
//}

?>