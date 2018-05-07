<?php
$api_layer = true;
require '../header.php';

function badRequest($code=400, $message="Bad Request") {
  http_response_code($code);
  $_SESSION['edit_'.$_POST['id'].'_noonce'] = generate_noonce();
  $response = array(
    'noonce' => $_SESSION['edit_'.$_POST['id'].'_noonce'] ,
    'local_id' => $_POST['id'],
    'error_msg' => $message
  );
  echo json_encode($response);
  die();
}
if($_SESSION['edit_'.$_POST['id'].'_noonce'] !== $_POST['update_noonce']) {
  badRequest(400, "NOONCE not set correctly SESSION:".$_SESSION['edit_'.$_POST['id'].'_noonce'].', POST:'.$_POST['update_noonce']);
}
if(!is_user_logged_in()) {
  badRequest(400, "User not logged in");
}

unset($_SESSION['edit_'.$_POST['id'].'_noonce']);

$response = array();
$_SESSION['edit_'.$_POST['id'].'_noonce'] = generate_noonce();
$response['noonce'] = $_SESSION['edit_'.$_POST['id'].'_noonce'];

$updated_item = update_item($_POST['id'],$_POST);

if($updated_item) {
  $response['updated'] = true;
  $response['item'] = $updated_item;
  echo json_encode($response);
  die();
} else {
  badRequest(500, "error updating item in DB");
  die();
}


 ?>
