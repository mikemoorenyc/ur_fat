<?php
//MAKE SURE THE POST IS LEGIT


function request_check() {
  if(!user_check() || !$_POST || $_SESSION[$_POST['noonce_key']] !== $_POST[$_POST['noonce_key']]) {
    return false;
  }
  return true;
}

?>
