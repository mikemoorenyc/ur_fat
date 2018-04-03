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

header("Location: index.php",TRUE,303);
die();
?>
