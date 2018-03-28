<?php

function get_items($id,$from,$to) {
  if(!is_user_logged_in()) {
    return false;
  }
  $fetch_id = $id ?: get_user()['id'];
  
  
  
  
}
