<?php
set_include_path('../');
require 'header.php';

function badRequest($code=400) {
  http_response_code($code);
  $_SESSION['delete_'.$_POST['id'].'_noonce'] = generate_noonce();
  $response = array(
    'noonce' => $_SESSION['delete_'.$_POST['id'].'_noonce'] ,
    'local_id' => $_POST['id']
  );
  echo json_encode($response);
  die();
}

if($_SESSION['delete_'.$_POST['id'].'_noonce'] !== $_POST['delete_noonce'] || !is_user_logged_in()) {
  badRequest();
}
unset($_SESSION['delete_'.$_POST['id'].'_noonce']);
$post = get_post_by_id($_POST['id']);

if($post['author'] !== get_user()['id']) {
  badRequest();
}
$deleted_item = delete_item($_POST['id']);

if($deleted_item) {
  $response = array(
    "deleted" => true
  );

  echo json_encode($response);
  die();
} else {
  badRequest();
}


 ?>
