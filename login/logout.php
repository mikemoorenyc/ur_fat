<?php
require_once ('../header.php');
$_SESSION['logged_in'] = false;
header("Location: ".$_SERVER['HTTP_REFERER']);
die();

 ?>
