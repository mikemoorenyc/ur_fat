<?php
function verify_remember_me() {
  global $db_conn;
  //DELETE OLD tokens
  $delete_all =  "DELETE FROM tokens WHERE expires <".time();
  $delete_tokens = mysqli_query($db_conn, $delete_all);



 if(!$_COOKIE['ur_fat_remember_me']) {
  return false;
 }
 $credentials = json_decode($_COOKIE['ur_fat_remember_me'],true);
 if(!$credentials['selector'] || !$credentials['validator']) {
  return false;
 }
 $get_token =  "SELECT * FROM tokens WHERE selector= '".intval($credentials['selector'])."' LIMIT 1";
 $token = $db_conn->query($get_token);
 if(!$token) {
  return false;
 }
 if($token->num_rows < 1) {
   return false;
 }
 $db_token =  $token->fetch_assoc();
 if(intval($db_token['expires']) < time()) {
   $del_id = intval($db_token['id']);
   $delete =  "DELETE FROM tokens WHERE id=$del_id";
   $delete_item = mysqli_query($db_conn, $delete);
   return false;
 }
 $hash_correct = hash_equals($db_token['hashedValidator'],hash('sha256', $credentials['validator'], true));
 if(!$hash_correct) {
   delete_remember_me();
   return false;
 }

 return login_user($db_token['user_id']);

}


 ?>
