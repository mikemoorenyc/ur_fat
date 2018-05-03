<?php
$api_layer = true;
require_once '../header.php';

function return_user($logged_in, $id=null) {
  echo json_encode(array(
    'logged_in' => $logged_in,
    'id' => $id
  ));
  die();
}

if(check_user()) {
  return_user(true, $_SESSION['current_user']);
} else {
  return_user(false);
}


?>
