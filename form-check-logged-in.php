<?php
require_once 'header.php';

$logged_in = is_user_logged_in();
$response = array();
if($logged_in) {
 $response['logged_in'] = true; 
} else {
 $response['logged_in'] = false;
}

if($_GET['factor'] === 'ajax') {
  echo json_encode($response);
  die();
}


?>
