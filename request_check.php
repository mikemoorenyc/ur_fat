<?php
//MAKE SURE THE POST IS LEGIT
if(!$_SESSION['logged_in'] || !$_SESSION['current_user'] || !$_POST || $_SESSION[$_POST['noonce_key']] !== $_POST[$_POST['noonce_key']]) {
  die('Bad request');
}

?>
