<?php
require_once '../header.php';

if(check_user()) {
  echo json_encode(array(
    "logged_in" => true,
    "id" => $_SESSION['current_user']
  ));
  die();
}

if(check_remember_me()) {
  $_SESSION['logged_in'] = true;
  $_SESSION['current_user'] = check_remember_me()['id'];
  echo json_encode(array(
    "logged_in" => true,
    "id" => $_SESSION['current_user']
  ));
  die();
}
function badLoginResponse() {
  http_response_code(400);
  echo json_encode(array(
    "logged_in" => false
  ));
  die();
}
if(!$_POST['email'] || $_POST['password']) {
  badLoginResponse();
}
$login_check = verify_login();
if(!$login_check) {
  badLoginResponse();
} else {
  $_SESSION['logged_in'] = true;
  $_SESSION['current_user'] = $login_check;
  create_remember_me();
  echo json_encode(array(
    "logged_in" => true,
    "id" => $_SESSION['current_user']
  ));
  die();
}


 ?>
