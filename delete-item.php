<?php
require_once 'header.php';
if(!request_check()) {
  die('Bad Request');
}

//WE ARE READY TO DELETE
$del_id = mysql_real_escape_string($_POST['delete_id']);
$delete =  "DELETE FROM posts WHERE id=$del_id";
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
