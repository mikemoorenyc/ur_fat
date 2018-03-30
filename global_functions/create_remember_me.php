<?php
function create_remember_me($id) {
  global $db_conn;
  if(!$id) {
    return false;
  }
  $selector = time();
  $plain_token = generate_noonce()
  $validator = hash('sha256', $plain_token, true);
  $user_id = intval($id);
  $now = new DateTime();
  $now->modify('+6 months');
  $expires = $datetime->getTimestamp();
  $insert_token = "INSERT INTO tokens (selector, hashedValidator, user_id, expires)
    VALUES ('$selector','$validator','$user_id','$expires')";

  $db_token = mysqli_query($db_conn, $insert_token);

  if($db_token) {
    setcookie("ur_fat_remember_me", json_encode("selector" => $selector , "validator" => $plain_token),$expires, '/');
    return true;
  } else {
    return false;
  }
}


?>
