<?php
$str_json = file_get_contents('php://input'); //($_POST doesn't work with JSON)
$response = json_decode($str_json, true); // decoding received JSON to array

// connecting to database
$mysqli = new mysqli(getenv("DB_URL"),getenv("DB_USER"), getenv("DB_PASS"), "heroku_9f3983ebc41e915");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else {
  $stmt = $mysqli->prepare("call spAddMessage(?,?);");
  // filling statement
  $stmt->bind_param("ss",$response["email"],$response["message"]);
  // execute query
  $stmt->execute();
  // close statement
  $stmt->close();
}
// closing database connection
mysqli_close($mysqli);

// make new JSON
include "makejson.php";
?>
