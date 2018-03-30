<?php
require_once 'header.php';
if($_SESSION['login_noonce'] !== $_POST['login_noonce']) {
  die('Bad request');
}
$_SESSION['login_noonce'] = null;
$_SESSION['login_alert'] = null;
$logged_in_user = verify_login($_POST['email'],$_POST['password']);

$_SESSION['logged_in'] = null;
$_SESSION['current_user'] = null;

if($logged_in_user) {
  $_SESSION['logged_in'] = true;
  $_SESSION['current_user'] = $logged_in_user;
  create_remember_me($_SESSION['current_user']['id']);
  header("Location: index.php",TRUE,303);

} else {
  $_SESSION['login_alert'] = "Invalid login";
  header("Location: user-login.php",TRUE,303);
}
die();
?>
