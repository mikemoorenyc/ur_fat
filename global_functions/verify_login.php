<?php
function verify_login($email=null,$password=null) {
  global $db_conn;
  if(!$email || !$password) {
    return false;
  }

    $get_user =  "SELECT * FROM users WHERE `email` = '".$db_conn->real_escape_string($email)."' LIMIT 1";

  $user = $db_conn->query($get_user);
  if($user->num_rows < 1 || !$user) {
    return false;
  }
  $user = $user->fetch_assoc();


  //CHECK PASSWORD
$pass_pass = password_verify(base64_encode(hash('sha256', $password, true)),$user['password']);
  if(!$pass_pass) {
    return false;
  }


  return login_user($user['id']);

}

 ?>
