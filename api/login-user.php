<?php
$api_layer = true;
require '../header.php';

if($_SESSION['login_noonce'] !== $_POST['login_noonce']) {
  http_response_code(401);
  echo json_encode(array("error_msg" => "Bad Noonce"));
  die();
}
unset($_SESSION['login_noonce']);
unset($_SESSION['login_alert']);
$logged_in_user = verify_login($_POST['email'],$_POST['pass']);
if($logged_in_user) {
  $remember_me = create_remember_me($logged_in_user['id']);
  $response = array(
    'logged_in' => true,
    'user' => get_user()
  );
  echo json_encode($response);
  die();
}
if(!$logged_in_user) {
  http_response_code(401);
  $_SESSION['login_noonce'] = generate_noonce();
  $response = array(
    'logged_in' => false,
    'login_noonce' => $_SESSION['login_noonce'],
    'error_msg' => 'Incorrect email or password.'
  );
  echo json_encode($response);
  die();
}
 ?>
