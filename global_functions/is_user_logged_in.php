<?php
function is_user_logged_in() {

  if(!$_SESSION['logged_in'] || !$_SESSION['current_user']) {
    return false;
  }
  return true;
}
