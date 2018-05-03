<?php
function get_user($id=null, $email=null) {
  global $db_conn;

  $user_id = $id ?: $_SESSION['current_user']['id'];
  if(!$user_id && !$email) {
    return false;
  }
  $get_user =  "SELECT id,email,reg_date FROM users WHERE `id` = '".$db_conn->real_escape_string($user_id)."' LIMIT 1";
  if(!$user_id) {
    $get_user =  "SELECT id,email,reg_date FROM users WHERE `email` = '".$db_conn->real_escape_string($email)."' LIMIT 1";
  }
  $user = $db_conn->query($get_user);
  if(!$user) {
    return false;
  }
  if($user->num_rows < 1) {
    return false;
  }
  return $user->fetch_assoc();

}


 ?>
