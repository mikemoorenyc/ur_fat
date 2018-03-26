<?php
require_once 'header.php';
require_once 'request_check.php';

$id = mysql_real_escape_string($_POST['update_id']);

$get_post =  "SELECT * FROM posts WHERE id=$id LIMIT 1";
$post = $db_conn->query($get_post);
if($post->num_rows < 1 || !$post) {
  die('bad request');
}
$post = $post->fetch_assoc();

$post_title = mysql_real_escape_string($_POST['post_title']) ?: $post['post_title'];
$post_description = mysql_real_escape_string($_POST['post_description']) ?: $post['post_description'];
$post_amount = mysql_real_escape_string($_POST['post_amount']) ?: $post['post_amount'];

$sql = "UPDATE posts SET post_title='$post_title', post_description='$post_description', post_amount='$post_amount' WHERE id=$id";

$update_item = mysqli_query($db_conn, $sql);

if ($update_item) {
    echo 'deleted';
} else {
  echo 'bad';
}
$_SESSION[$_POST['noonce_key']] = '';
header("Location: ".$_SERVER['HTTP_REFERER']);
die();

?>
