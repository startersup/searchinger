<?php


/* Get the info for the particular route */
// if ($operationRequest == 'info') {

    $sql = "SELECT " . $colsAllView . " FROM `" . $tableName . "` WHERE `" . $uniqueKey . "` ='" . $uniqueValue . "' ";
    $result =  mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        $temp[] = $row;
    }
    if ($temp == null) {
        $temp = array();
    }

    $response["data"] = $temp;
    echo json_encode($response);
    exit(0);

    // }

?>