<?php

function add_item($post_title,$post_description,$post_amount,$post_date,$post_author) {
  global $db_conn;
  if(!$post_title || !$post_date || !$post_author) {
    return false;
  }
  $title = mysql_real_escape_string($post_title);
  $amount = mysql_real_escape_string($post_amount);
  $desc = mysql_real_escape_string($post_description);
  $date = intval($post_date);
  $author = intval($post_author);
  $insert = "INSERT INTO posts (post_title, post_description, post_amount, author, post_date)
    VALUES ('$title','$desc','$amount','$author','$date')";



  $insert_item = mysqli_query($db_conn, $insert);

  if($insert_item) {
    return get_post_by_id(mysqli_insert_id($db_conn));
  } else {
    return false;
  }

}

 ?>
