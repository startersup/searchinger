<?php

$sql_prefix ="SELECT prefix from `prefix_table` where `table_name` = '".$tableName."' ";
$result_prefix=  mysqli_query($conn,$sql_prefix);
  
$row_prefix= mysqli_fetch_array($result_prefix,MYSQLI_ASSOC);
$unique_prefix = $row_prefix["prefix"];

?>