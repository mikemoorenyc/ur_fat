<?php
require 'db_connect.php';

if(!$need_to_install) {
  die('Site is already installed');
}
$errors = false;
$sql = "CREATE TABLE users (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL DEFAULT '',
  password VARCHAR(255) NOT NULL ,
  reg_date BIGINT(20) NOT NULL DEFAULT 0
)";
$create_users = mysqli_query($db_conn, $sql);


$posts_table = "CREATE TABLE posts (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_title TEXT NOT NULL,
  post_description LONGTEXT ,
  post_amount TEXT NOT NULL,
  author BIGINT(20) UNSIGNED NOT NULL default 0,
  post_date BIGINT(20) NOT NULL DEFAULT 0
)";

$tokens_table = "CREATE TABLE tokens (
  id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  selector BIGINT(20) NOT NULL DEFAULT 0,
  hashedValidator char(64),
  user_id BIGINT(20) UNSIGNED NOT NULL default 0,
  expires BIGINT(20) NOT NULL DEFAULT 0
)";

$create_posts = mysqli_query($db_conn, $posts_table);
$create_tokens = mysqli_query($db_conn, $tokens_table);

if(!$create_posts || !$create_tokens || !$create_users) {
  die('something went wrong');
}

echo 'Tables created <a href="install.php">Go to URFAT</a>';
die();

 ?>
