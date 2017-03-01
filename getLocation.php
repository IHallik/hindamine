<?php
$localInit = 'localinit.php';
if (file_exists($localInit)) {//only runs in localhost
  include $localInit;
}
error_reporting(1);
$id = $_GET["id"];

// connecting to database
$mysqli = new mysqli(getenv("DB_URL"),getenv("DB_USER"), getenv("DB_PASS"), "heroku_9f3983ebc41e915");

if ($mysqli->connect_errno) {
    $response_array = array("success" => false, "message" => "couln't connect to DB, try again");
} else {
  $stmt = $mysqli->prepare("call spGetLocation(?);");
  // filling statement
  $stmt->bind_param("i",$id);
  // execute query
  $stmt->execute();
  $result = $stmt->get_result();
  // close statement
  $stmt->close();

  $message = $result->fetch_array(MYSQLI_ASSOC);
  $response_array = array("success" => true,"location" => $message);
}
// closing database connection
mysqli_close($mysqli);

// make new JSON
include "makejson.php";

header("Content-type: application/json");
echo json_encode($response_array);
?>
