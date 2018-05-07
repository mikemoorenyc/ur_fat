<?php
$api_layer = true;
require '../header.php';

function badRequest($code=400,$message="Bad Request") {
  http_response_code($code);
  $_SESSION['add_item_noonce'] = generate_noonce();
  $response = array(
    'add_item_noonce' => $_SESSION['add_item_noonce'],
    'local_id' => $_POST['local_id'],
    "error_msg" => $message
  );
  echo json_encode($response);
  die();
}
if($_SESSION['add_item_noonce'] !== $_POST['add_item_noonce']) {
  badRequest(400,"NOONCE not set correctly SESSION:".$_SESSION['add_item_noonce'].', POST:'.$_POST['add_item_noonce']);
}
if(!is_user_logged_in()) {
  badRequest(400,"You are not logged in");
}

if(!$_POST['post_title']) {
  badRequest(400, "There is no title for this");
}
unset($_SESSION['add_item_noonce']);

$author = $_POST['post_author'] ?: $_SESSION['current_user']['id'];

$date = parse_time($_POST['post_date']) ?: time();

$item = add_item($_POST['post_title'],$_POST['post_description'],$_POST['post_amount'],$date,$author);

if(!$item) {
  badRequest(500, "Could not add item to database");
}
$_SESSION['add_item_noonce'] = generate_noonce();
$_SESSION['edit_'.$item['id'].'_noonce'] = generate_noonce();
$response = array(
  "new_item" => $item,
  'add_item_noonce' => $_SESSION['add_item_noonce'],
  "noonce" => $_SESSION['edit_'.$item['id'].'_noonce'],
  'local_id' => $_POST['local_id']
);

echo json_encode($response);
die();


 ?>
