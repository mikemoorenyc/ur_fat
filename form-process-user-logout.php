<?php
require_once 'header.php';

$logged_out = logout_user(get_user()['id']);

var_dump($logged_out);
die();
header("Location: user-login.php",TRUE,303);
die();

 ?>
