<?php
function is_user_logged_in() {
  verify_remember_me();

  if(!$_SESSION['logged_in'] || !$_SESSION['current_user']) {
    return false;
  }
  return true;
}
