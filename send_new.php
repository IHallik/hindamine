<?php
$localInit = 'localinit.php';
if (file_exists($localInit)) {//only runs in localhost
  include $localInit;
}
$str_json = file_get_contents('php://input'); //($_POST doesn't work with JSON)
$response = json_decode($str_json, true); // decoding received JSON to array

// connecting to database
$mysqli = new mysqli(getenv("DB_URL"),getenv("DB_USER"), getenv("DB_PASS"), "heroku_9f3983ebc41e915");

if ($mysqli->connect_errno) {
    $response_array = array("success" => false, "status" => "couln't connect to DB, try again");
} else {
  $response_array = array("success" => true,"status" => "message added");
  $stmt = $mysqli->prepare("call spAddPost(?, ?, ?, ?, ?, ?);");
  // filling statement
  $stmt->bind_param("ssiiis",$response["email"],$response["message"],$response["location"],$response["people_count"],$response["public"],$response["event_time"]);
  // execute query
  $stmt->execute();
  // close statement
  $stmt->close();
}
// closing database connection
mysqli_close($mysqli);

// make new JSON
include "makejson.php";

header("Content-type: application/json");
echo json_encode($response_array);
?>
