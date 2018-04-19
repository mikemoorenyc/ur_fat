<?php
set_include_path('../');
require 'header.php';

if(!is_user_logged_in()) {
 http_response_code(401);
 die();
}

$offset = $_GET['offset'] ?: "0";

$now = new DateTime();
$ny_time  = new DateTimeZone('America/New_York');
$now->setTimezone($ny_time);
$now->modify(intval($_GET['offset']).' day');
$startTime =  strtotime($now->format('Y-m-d 00:00:00 O'));
$endTime = strtotime($now->format('Y-m-d 23:59:59 O'));
$today_posts = get_posts($startTime, $endTime, get_user()['id']);

$response = array();

$response['top_threshold'] = $endTime;
$response['bottom_threshold'] = $startTime;

$response['offset'] = $offset;
$response['items'] = $today_posts;

$response['edit_noonces'] = array();
foreach($response['today_posts'] as $k => $p) {
  $_SESSION['edit_'.$p['id'].'_noonce'] = generate_noonce();
  $response['edit_noonces']['item_'.$p['id']] = $_SESSION['edit_'.$p['id'].'_noonce'];
}

echo json_encode($response);
die();
