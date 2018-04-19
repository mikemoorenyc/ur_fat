<?php
set_include_path('../');
require 'header.php';

if(!$_POST['noonce_key']) {
http_response_code(400);
die();
}
$_SESSION[$_POST['noonce_key']] = generate_noonce();

$response[$_POST['noonce_key']] = $_SESSION[$_POST['noonce_key']];

echo json_encode($response);
die();

?>
