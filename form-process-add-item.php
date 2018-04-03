<?php
require_once 'header.php';
if($_SESSION['add_item_noonce'] !== $_POST['add_item_noonce'] || !is_user_logged_in()) {
  die('Bad request');
}
if(!$_POST['post_title']) {
  die();
}


$author = $_POST['post_author'] ?: $_SESSION['current_user']['id'];

$date = parse_time($_POST['post_date']) ?: time();

$item = add_item($_POST['post_title'],$_POST['post_description'],$_POST['post_amount'],$date,$author);

unset($_SESSION['add_item_noonce'])
header("Location: index.php",TRUE,303);
