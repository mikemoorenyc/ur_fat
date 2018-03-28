<?php
require_once 'header.php';

if($_SESSION['create_noonce'] !== $_POST['create_noonce']) {
  die('Bad request');
}
echo 'all good';
$_SESSION['create_noonce'] = null;
$_SESSION['login_alert'] = null;

$new_user = create_user($_POST['email'],$_POST['password']);

if(!$new_user['success']) {
  $_SESSION['login_alert'] = 'No good';
  header("Location: user-login.php?action=create",TRUE,303);
  die();
}
if($new_user['success']) {
  $_SESSION['login_alert'] = 'Successfully created. Please log in';
  header("Location: user-login.php",TRUE,303);
  die();
}

 ?>
