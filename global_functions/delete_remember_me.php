<?php
function delete_remember_me() {
  global $db_conn;
   $credentials = json_decode($_COOKIE['ur_fat_remember_me'],true);

   $sql =  "DELETE FROM tokens WHERE selector=".intval($credentials['selector']);
   $deleted_token =  mysqli_query($db_conn, $sql);
   if($deleted_token) {
     return true;
     unset($_COOKIE["ur_fat_remember_me"]);
   } else {
     return false;
   }
   
}

 ?>
