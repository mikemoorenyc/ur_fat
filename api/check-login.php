<?php
require '../header.php';

$logged_in = is_user_logged_in();

if($logged_in) {
 http_response_code(200);
 echo json_encode()
}
  

?>
