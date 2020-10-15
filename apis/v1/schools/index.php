<?php

include('../common/index.php');

$tableName = "routes";
$uniqueKey = "routeId";
$uniqueValue = $_POST[$uniqueKey];
$whereClause = " WHERE " . $_POST["whereClause"];
$colsForTableView = " `id`, `routeId`,`routeName`, `fromDate`, `toDate`, `run1Flag`, `run2Flag`,`councilFare`, `yourFare`, `driverFare`, `escortFare` ";
$colsAllView = " `id`, `routeId`, `routeName`, `fromDate`, `toDate`, `run1Flag`, `run2Flag`, `run1Start`, `run1End`, `run2Start`, `run2End`, `schoolId`, `studentId`, `driverId`, `escortId`, `sunday`, `monday`, `tuesday`, `wednesday`, `thusday`, `friday`, `saturday`, `sundayFlag`, `mondayFlag`, `tuesdayFlag`, `wednesdayFlag`, `thursdayFlag`, `fridayFlag`, `saturdayFlag`, `councilFare`, `yourFare`, `driverFare`, `escortFare`, `ro`, `specialInfo`, `training`, `wscc`, `notes`, `tiktok` ";


include('../operation/index.php');
?>