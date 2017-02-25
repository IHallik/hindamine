<?php
$localInit = 'localinit.php';
if (file_exists($localInit)) {//only runs in localhost
  include $localInit;
}
error_reporting(1);
header('Content-type:application/json;charset=utf-8');

$mysqli = new mysqli(getenv("DB_URL"),getenv("DB_USER"), getenv("DB_PASS"), "heroku_9f3983ebc41e915");
if ($mysqli->connect_errno) {
  $message = array(
      "email" => "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error,
      "count" => "-1");
    mysqli_close($mysqli);
} else {
  // creating JSON file
  $res = $mysqli->query("call spMostMessages();");
  // fetchin the data
  $message = $res->fetch_array(MYSQLI_ASSOC);
  // closing database connection
  mysqli_close($mysqli);
}
// closing DB connection
mysqli_close($mysqli);

$json = json_encode($message);
echo $json;

?>
