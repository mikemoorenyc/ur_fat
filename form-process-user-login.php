<?php
require_once 'header.php';
if($_SESSION['login_noonce'] !== $_POST['login_noonce']) {
  die('Bad request');
}
$_SESSION['login_noonce'] = null;
$_SESSION['login_alert'] = null;
$logged_in_user = verify_login($_POST['email'],$_POST['password']);
