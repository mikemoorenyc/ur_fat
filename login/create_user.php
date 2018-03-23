<?php
require_once ('../header.php');
require_once 'form_validator.php';
$_SESSION['logged_in'] = false;

//WE'RE GOOD TO GO ON THIS


$stored_pass = password_hash(
    base64_encode(
        hash('sha256', mysql_real_escape_string($_POST['password']), true)
    ),
    PASSWORD_DEFAULT
);

$insert_db = "INSERT INTO users (email, password, reg_date) VALUES ('".mysql_real_escape_string($_POST['email'])."', '".$stored_pass."', '".time()."')";

$add_user = mysqli_query($db_conn, $insert_db);

if ($add_user) {
    $_SESSION['login_alert'] = array(
      'type' => 'good',
      'content' => 'Your account has been created. Please login now.'
    );
} else {
  $_SESSION['login_alert'] = array(
    'type' => 'bad',
    'content' => "Couldn't add the account. Try again."
  );
}

resetForm();




 ?>
