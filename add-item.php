<?php
require_once 'header.php';

if(!check_request()) {
  die('Bad Request');
}



$title = mysql_real_escape_string($_POST['item_title']);
$amount = mysql_real_escape_string($_POST['item_amount']);
$desc = mysql_real_escape_string($_POST['item_description']);
$date = parse_time($_POST['post_date']) ?: time();
$author = $_SESSION['current_user'];
$insert = "INSERT INTO posts (post_title, post_description, post_amount, author, post_date)
  VALUES ('$title','$desc','$amount','$author','$date')";



$insert_item = mysqli_query($db_conn, $insert);

if ($insert_item) {
    echo 'added';
} else {
  echo 'bad';
}


//NON API CALL
$_SESSION[$_POST['noonce_key']] = '';

header("Location: ".$_SERVER['HTTP_REFERER']);
die();

?>
