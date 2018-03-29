<?php
function verify_remember_me() {
 if(!$_COOKIE['remember_me']) {
  return false;
 }
 $credentials = json_decode($_COOKIE['remember_me'],true);
 if(!$credentials['selector'] || !$credentials['validator']) {
  return false;
 }
}


 ?>
