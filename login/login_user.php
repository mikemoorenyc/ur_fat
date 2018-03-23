<?php
require_once ('../header.php');
require_once 'form_validator.php';
$_SESSION['logged_in'] = false;

function badLogin() {
  $_SESSION['login_alert'] = array(
    'type' => 'bad',
    'content' => 'Bad email or password.'
  );
  resetForm();
}

//CHECK IF EMAIL EXISTS
$get_user =  "SELECT id, email, password FROM users WHERE `email` = '".mysql_real_escape_string($_POST['email'])."' LIMIT 1";
$user = $db_conn->query($get_user);
if($user->num_rows < 1) {
  badLogin();
}
$user = $user->fetch_assoc();

//CHECK PASSWORD
$pass_pass = password_verify(base64_encode(hash('sha256', $_POST['password'], true)),$user['password']);
if(!$pass_pass) {
  badLogin();
}
$_SESSION['logged_in'] = true;
$_SESSION['current_user'] = $user['id'];
$current_URL  = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$index_URL = str_replace('login/login_user.php','',$current_URL);
header("Location: ".$index_URL);

die();
 ?>
