<?php
require_once 'header.php'
require_once 'request_check.php';

//WE ARE READY TO DELETE

$delete =  "DELETE FROM posts WHERE id=$_POST['delete_id']";
$delete_item = mysqli_query($db_conn, $delete);


if ($delete_item) {
    echo 'deleted';
} else {
  echo 'bad';
}



$_SESSION[$_POST['noonce_key']] = '';
header("Location: ".$_SERVER['HTTP_REFERER']);
die();

?>
