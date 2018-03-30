<?php
function update_item($id = null,$update_array = null) {
  global $db_conn;
  if(!$id || !$update_array) {
    return false;
  }

  $ok_to_change = ['post_title',"post_description","post_amount","post_date"];
  $update_fields = array();
  foreach($update_array as $k => $e) {
    if(!in_array($k, $ok_to_change)) {
      continue;
    }
    $update_fields[] = "$k='$e'";
  }
  $update_post = get_post_by_id($id);
  if(!$update_post) {
    return false;
  }
  if(empty($update_fields)){
    return $update_post;
  }

  $sql = "UPDATE posts SET ".implode(", ",$update_fields)." WHERE id=".intval($id);

  $update_item = mysqli_query($db_conn, $sql);
  if ($update_item) {
      return get_post_by_id($id);
  } else {
    return false;
  }
}

?>
