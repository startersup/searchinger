<?php

    $sql = " SELECT " . $colsForTableView . " FROM `" . $tableName . "` " . $whereClause;
    $result =  mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        $temp[] = $row;
    }
    if ($temp == null) {
        $temp = array();
    }

    $response["data"] = $temp;
    $response["sql"] = $sql;
    echo json_encode($response);
    exit(0);
?>