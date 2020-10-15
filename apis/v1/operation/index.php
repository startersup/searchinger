<?php

if (strtoupper($requestMethod) == 'GET') {
    include('../operation/select.php');
} else if (strtoupper($requestMethod) == 'POST') {
    if ($uniqueValue == "" && $_POST["data"] != "") {
        include('../operation/insert.php');
    } else {
        include('../operation/info.php');
    }
} else if (strtoupper($requestMethod) == 'PUT') {
    if ($post_vars["whereClause"] != "") {
        $whereClause = " WHERE " . $post_vars["whereClause"];
    }
    $uniqueValue = $post_vars[$uniqueKey];
    include('../operation/update.php');
} else if (strtoupper($requestMethod) == 'DELETE') {
    include('../operation/delete.php');
}
