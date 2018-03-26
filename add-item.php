<?php
require_once 'header.php';

require_once 'request_check.php';

//READY TO GO



$title = mysql_real_escape_string($_POST['item_title']);
$amount = mysql_real_escape_string($_POST['item_amount']);
$desc = mysql_real_escape_string($_POST['item_description']);
$date = time();
$author = $_SESSION['current_user'];
$insert = "INSERT INTO posts (post_title, post_description, post_amount, author, post_date)
  VALUES ('$title','$desc','$amount','$author','$date')";



$insert_item = mysqli_query($db_conn, $insert);

if ($insert_item) {
    echo 'added';
} else {
  echo 'bad';
}
$_SESSION[$_POST['noonce_key']] = '';

header("Location: ".$_SERVER['HTTP_REFERER']);
die();

?>
