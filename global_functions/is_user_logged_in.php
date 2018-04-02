<?php
function is_user_logged_in() {
  
  if($_SESSION['logged_in'] && $_SESSION['current_user']) {
   return true; 
  }
  
  $remembered = verify_remember_me();
  
  if($remembered) {
    return true;
  } else {
    return false;
  }

  return false;
}
