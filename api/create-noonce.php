<?php
require_once '../header.php';

if(!$_POST['noonce_key']) {
http_response_code(400);
die();
}
$_SESSION[$_POST['noonce_key']]

?>
