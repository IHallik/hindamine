<?php
// setting Content-type and charset
header('Content-type:application/json;charset=utf-8');

// connecting to database
$mysqli = new mysqli(getenv("DB_URL"),getenv("DB_USER"), getenv("DB_PASS"), "heroku_9f3983ebc41e915");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
// requsting data from database
$res = $mysqli->query("SELECT * FROM `test_view`");
// closing database connection
mysqli_close($mysqli);

// handeling data
$resultArray = $res->fetch_all(MYSQLI_ASSOC);

// sending json
echo json_encode($resultArray);
?>
