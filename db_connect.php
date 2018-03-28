<?php
require 'database_info.php';


$db_conn =  mysqli_connect($db_servername, $db_username, $db_password, $db_dbname);

if (!$db_conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//SHOW TABLES LIKE 'yourtable';
$sql = "SHOW TABLES LIKE 'users'";
$result = mysqli_query($db_conn, $sql);

if(!$result->num_rows) {
  $need_to_install = true;
}



 ?>
