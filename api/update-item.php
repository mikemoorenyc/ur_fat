<?php
set_include_path('../');
require 'header.php';

function badRequest($code=400) {
  http_response_code($code);
  $_SESSION['edit_'.$_POST['id'].'_noonce'] = generate_noonce();
  $response = array(
    'noonce' => $_SESSION['edit_'.$_POST['id'].'_noonce'] ,
    'local_id' => $_POST['id']
  );
  echo json_encode($response);
  die();
}

if($_SESSION['edit_'.$_POST['id'].'_noonce'] !== $_POST['update_noonce'] || !is_user_logged_in()) {
  badRequest();
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
  badRequest();
  die();
}


 ?>
