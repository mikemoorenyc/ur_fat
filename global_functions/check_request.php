<?php
function request_check() {
  if(!heck_user() || !$_POST || $_SESSION[$_POST['noonce_key']] !== $_POST[$_POST['noonce_key']]) {
    return false;
  }
  return true;
}
