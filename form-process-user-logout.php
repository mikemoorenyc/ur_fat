<?php
require_once 'header.php';

$logged_out = logout_user(get_user()['id']);


header("Location: user-login.php",TRUE,303);
die();

 ?>
