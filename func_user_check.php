<?php
function user_check() {
  if(!$_SESSION['logged_in'] || !$_SESSION['current_user']) {
    return false;
  }
  return true;
}


 ?>
