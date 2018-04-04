<?php
require_once 'header.php';
if($_SESSION['login_noonce'] !== $_POST['login_noonce']) {
  die('Bad request');
}
unset($_SESSION['login_noonce']);
unset($_SESSION['login_alert']);

$logged_in_user = verify_login($_POST['email'],$_POST['password']);

if($logged_in_user) {
  $remember_me = create_remember_me($logged_in_user['id']);
}

if($_GET['factor'] === 'ajax') {
 $response = array();
 if($logged_in_user) {
  $response['logged_in'] = true;
  $response['user'] = get_user();
 } else {
  $response['logged_in'] = false;
 }
 
 echo json_encode($response);
  
 die(); 
}

header("Location: index.php",TRUE,303);
die();
?>
