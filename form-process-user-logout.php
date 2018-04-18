<?php
set_include_path('./');
require_once 'header.php';

$logged_out = logout_user(get_user()['id']);

$re = $_GET['re'] ?: 'user-login.php' ;

header("Location: ".$re,TRUE,303);
die();

 ?>
