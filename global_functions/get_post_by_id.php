<?php
function get_post_by_id($id) {
  global $db_conn;
  if(!$id) {
    return false;
  }
  $get_post =  "SELECT * FROM posts WHERE `id` = '".intval($id)."' LIMIT 1";
  $post = $db_conn->query($get_post);
  if(!$post) {
    return false;
  }
  if($post->num_rows < 1) {
    return false;
  }
  return $post->fetch_assoc();
}

 ?>
