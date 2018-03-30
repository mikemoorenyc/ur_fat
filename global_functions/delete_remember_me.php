<?php
function delete_remember_me() {
  global $db_conn;
   $credentials = json_decode($_COOKIE['ur_fat_remember_me'],true);
   var_dump($credentials);
   $sql =  "DELETE FROM tokens WHERE selector=".intval($credentials['selector']);
   $deleted_token =  mysqli_query($db_conn, $sql);
   if($deleted_token) {
     return 'deleted';
     unset($_COOKIE["ur_fat_remember_me"]);
   }
   return $deleted_token;
}

 ?>
