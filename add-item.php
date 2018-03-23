<?php
require_once 'header.php';

//MAKE SURE THE POST IS LEGIT
if(!$_SESSION['logged_in'] || !$_SESSION['current_user'] || !$_POST || $_SESSION['add_noonce'] !== $_POST['add_noonce']) {
  die('Bad request');
}



?>
