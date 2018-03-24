<?php
require_once 'header.php';

//MAKE SURE THE POST IS LEGIT

if(!$_SESSION['logged_in'] || !$_SESSION['current_user'] || !$_POST || $_SESSION[$_POST['noonce_key']] !== $_POST[$_POST['noonce_key']]) {
  die('Bad request');
}

//READY TO GO
var_dump($_POST);
$date = time();

if($_POST['item_date']) {

}
$title = mysql_real_escape_string($_POST['item_title']);
$amount = mysql_real_escape_string($_POST['item_amount']);
$desc = mysql_real_escape_string($_POST['item_description']);

$author = $_SESSION['current_user'];
$insert = "INSERT INTO posts (post_title, post_description, post_amount, author, post_date)
  VALUES ('$title','$desc','$amount','$author','$date')";

die();


$insert_item = mysqli_query($db_conn, $insert);

if ($insert_item) {
    echo 'added';
} else {
  echo 'bad';
}
$_SESSION[$_POST['noonce_key']] = '';

?>
