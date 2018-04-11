<?php
set_include_path('../');
require 'header.php';
$response = array();
$logged_in = is_user_logged_in();
$response['logged_in'] = $logged_in;
if(!$logged_in) {
 //NOT LOGGED IN
 http_response_code(200);
 $_SESSION['login_noonce'] = generate_noonce();
 $response['login_noonce'] = $_SESSION['login_noonce'];
 echo json_encode($response);
 die();
}

http_response_code(200);
$response['user'] = get_user();





$now = new DateTime();
$ny_time  = new DateTimeZone('America/New_York');
$now->setTimezone($ny_time);

$startTime =  strtotime($now->format('Y-m-d 00:00:00 O'));
$endTime = strtotime($now->format('Y-m-d 23:59:59 O'));
$response['today_posts'] = get_posts($startTime, $endTime, get_user()['id']);


echo json_encode($response);
die();






?>
