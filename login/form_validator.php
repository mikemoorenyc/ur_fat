<?php

$_SESSION['login_alert'] = array();
function resetForm() {
  header("Location: ".$_SERVER['HTTP_REFERER']);
  die();
}
if(!$_POST) {
  echo 'no form';
  die();
}
if(!$_POST['email'] || !$_POST['password']) {
  resetForm();
}


if($_SESSION['noonce_token'] !== $_POST['noonce']) {
  echo 'bad noonce';
  die();
}
$_SESSION['noonce_token'] = null;

$_SESSION['errors'] = array();

if(strlen($_POST['password']) < 5 || strlen($_POST['password']) > 255) {
  $_SESSION['errors']['password'] = "That's a bad password";
}
if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) || strlen($_POST['email']) > 100) {
  $_SESSION['errors']['email'] = "That's a bad email address";
}
if(!empty($_SESSION['errors'])) {
  resetForm();
}

 ?>
