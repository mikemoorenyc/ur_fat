<?php
function delete_item($id=null) {
  if(!$id){return false;}
  global $db_conn;
  $delete_post = get_post_by_id($id);
  if(!$delete_post) {
    return false;
  }

  $sql = "DELETE FROM posts WHERE id=".intval($id);

  $delete_item = mysqli_query($db_conn, $sql);

  if ($delete_item) {
    return true;
  } else {
    return false;
  }


}

 ?>
