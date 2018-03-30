<?php
require_once 'header.php';

if($_SESSION['update_'.$_POST['id']] !== $_POST['update_'.$_POST['id']] || !is_user_logged_in()) {
  die('Bad request');
}
$_SESSION['update_'.$_POST['id']] = null;
$post = get_post_by_id($_POST['id']);

if($post['author'] !== get_user()['id']) {
  die('Not allowed to edit');
}
$updated_item = update_item($_POST['id'],$_POST);

if($updated_item) {
  echo 'all good';
  header("Location: index.php",TRUE,303);
} else {
  echo 'all bad';
  header("Location: index.php",TRUE,303);
}
die();
