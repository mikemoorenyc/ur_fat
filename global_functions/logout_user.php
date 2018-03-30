<?php
function logout_user($id=null) {

  $user_id = $id ?: get_user()['id'];

  if(!$user_id) {
    return false;
  }
  $_SESSION['logged_in'] = false;
  $_SESSION['current_user'] = null;
  return delete_remember_me();
  //DELETE TOKEN
  return true;

}

 ?>
