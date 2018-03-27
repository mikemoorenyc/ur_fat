<?php
//READY TO GO
function parse_time($date) {
  if(!validate_date($date) {
    return false;
  }
  $now = new DateTime();
  $ny_time  = new DateTimeZone('America/New_York');
  $now->setTimezone($ny_time);   
  return strtotime($now->format($date.' O'));
}
?>
