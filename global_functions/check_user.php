<?php
function check_user() {
  if(!$_SESSION['logged_in'] || !$_SESSION['current_user']) {
    return false;
  }
  return true;
}
