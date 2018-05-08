<?php
$api_layer = true;
require '../header.php';

if(!$_POST['noonce_key']) {
http_response_code(400);
die();
}

$ref = $_SERVER['HTTP_REFERER'];
$refData = parse_url($ref);
if($refData['host'] !== $_SERVER['SERVER_NAME']) {
  http_response_code(401);
  die();
}


$_SESSION[$_POST['noonce_key']] = generate_noonce();

$response[$_POST['noonce_key']] = $_SESSION[$_POST['noonce_key']];

echo json_encode($response);
die();

?>
