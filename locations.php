<?php
header('Content-type:application/json;charset=utf-8');
// set php runtime to unlimited
set_time_limit(0);

// where does the data come from ? In real world this would be a SQL query or something
$data_source_file = 'locations.json';
if (!file_exists($data_source_file)) {
  include "makejson_locations.php";
}

// main loop
while (true) {

    // PHP caches file data, like requesting the size of a file, by default. clearstatcache() clears that cache
    clearstatcache();
    // get timestamp of when file has been changed the last time
    $last_change_in_data_file = filemtime($data_source_file);

    // if no timestamp delivered via ajax or data.txt has been changed SINCE last ajax timestamp
    $json = file_get_contents($data_source_file);
    echo $json;
    break;
}
