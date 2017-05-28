<?php
$localInit = 'localinit.php';
if (file_exists($localInit)) {//only runs in localhost
  include $localInit;
}
$mysqli = new mysqli(getenv("DB_URL"),getenv("DB_USER"), getenv("DB_PASS"), "heroku_9f3983ebc41e915");
if ($mysqli->connect_errno) {
  $messages = array(
    array(
      "messages" => "Failed to connect to MySQL",
      "email_address" => "innar.hallik@gmail.com")
  );
    mysqli_close($mysqli);
} else {
  // creating JSON file
  $res = $mysqli->query("SELECT * FROM `location_view`");
  // fetchin all the data
  $messages = $res->fetch_all(MYSQLI_ASSOC);
  // closing database connection
  mysqli_close($mysqli);
}
// closing DB connection

// creating JSON file
$fp = fopen('locations.json', 'w');
fwrite($fp, json_encode($messages));
fclose($fp);
?>
