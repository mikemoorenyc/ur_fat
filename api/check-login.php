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

$_SESSION['add_item_noonce'] = generate_noonce();
$response['add_item_noonce'] = $_SESSION['add_item_noonce'];

/*

$now = new DateTime();
$ny_time  = new DateTimeZone('America/New_York');
$now->setTimezone($ny_time);

$startTime =  strtotime($now->format('Y-m-d 00:00:00 O'));
$endTime = strtotime($now->format('Y-m-d 23:59:59 O'));
$response['today_posts'] = get_posts($startTime, $endTime, get_user()['id']);
$response['edit_noonces'] = array();
foreach($response['today_posts'] as $k => $p) {
  $_SESSION['edit_'.$p['id'].'_noonce'] = generate_noonce();
  $response['edit_noonces']['item_'.$p['id']] = $_SESSION['edit_'.$p['id'].'_noonce'];
}

 $_SESSION['add_item_noonce'] = generate_noonce();
 $response['add_item_noonce'] = $_SESSION['add_item_noonce'];
 */

echo json_encode($response);
die();






?>
