<?php
require_once 'header.php';

if(check_remember_me()) {
  $_SESSION['logged_in'] = true;
  $_SESSION['current_user'] = check_remember_me()['id'];
  echo json_encode(array(
    "logged_in" => true,
    "id" => $_SESSION['current_user']
  ));
  die();
}


 ?>
