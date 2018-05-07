<?php
$api_layer = true;
require '../header.php';

function badRequest($code=400,$message="Bad Request") {
  http_response_code($code);
  $_SESSION['edit_'.$_POST['id'].'_noonce'] = generate_noonce();
  $response = array(
    'noonce' => $_SESSION['edit_'.$_POST['id'].'_noonce'] ,
    'local_id' => $_POST['id'],
    "error_msg" => $message
  );
  echo json_encode($response);
  die();
}
if($_SESSION['edit_'.$_POST['id'].'_noonce'] !== $_POST['delete_noonce']) {
  badRequest(400,"Bad noonce");
}
if(!is_user_logged_in()) {
  badRequest(400,"User is not logged in");
}

unset($_SESSION['edit_'.$_POST['id'].'_noonce']);
$post = get_post_by_id($_POST['id']);

if($post['author'] !== get_user()['id']) {
  badRequest(400, "Author of item does not match");
}
$deleted_item = delete_item($_POST['id']);

if($deleted_item) {
  $response = array(
    "deleted" => true
  );

  echo json_encode($response);
  die();
} else {
  badRequest(500, "COuld not delete item from DB");
}


 ?>
