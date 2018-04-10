<?php
require '../header.php';
$response = array();
$logged_in = is_user_logged_in();
$response['logged_in'] = $logged_in;
if($logged_in) {
 http_response_code(200);
 $response['user'] = get_user();
 echo json_encode($response);
 die();
}
//NOT LOGGED IN
http_response_code(200);
$_SESSION['login_noonce'] = generate_noonce();
$response['login_noonce'] = $_SESSION['login_noonce'];
echo json_encode($response);
die();

?>
