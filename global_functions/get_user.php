<?php
function get_user($id=null, $email=null) {
  global $db_conn;
  if(!$id && !$email) {
    return false;
  }
  $get_user =  "SELECT id,email,reg_date FROM users WHERE `id` = '".mysql_real_escape_string($id)."' LIMIT 1";
  if(!$id) {
    $get_user =  "SELECT id,email,reg_date FROM users WHERE `email` = '".mysql_real_escape_string($email)."' LIMIT 1";
  }
  $user = $db_conn->query($get_user);
  if($user->num_rows < 1) {
    return false;
  }
  return $user->fetch_assoc();

}


 ?>
