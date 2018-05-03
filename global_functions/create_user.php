<?php
function create_user($email=null, $password=null) {
  global $db_conn;

  if(!$email || !$password) {
    return false;
  }
  $errors = array();

  if(get_user(null,$email)) {
    $errors['used_email'] = true;
    return array(
      "success" => false,
      "errors" => $errors
    );
  }

  if(strlen($password) < 5 || strlen($password) > 255) {
    $errors['password'] = true;
  }
  if(!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 100) {
    $errors['email'] = true;
  }
  if(!empty($errors)) {
    return array(
      "success" => false,
      "errors" => $errors
    );
  }
  //ALL GOOD ADD THE USER
  $stored_pass = password_hash(
      base64_encode(
          hash('sha256', $db_conn->real_escape_string($password), true)
      ),
      PASSWORD_DEFAULT
  );

  $insert_db = "INSERT INTO users (email, password, reg_date) VALUES ('".$db_conn->real_escape_string($email)."', '".$stored_pass."', '".time()."')";

  $add_user = mysqli_query($db_conn, $insert_db);


  if ($add_user) {
    return array(
      "success" => true,
      "user" => get_user(null, $email)
    );

  } else {
    return array(
      "success" => false,
      "errors" => array('server' => true)
    );
  }
}


 ?>
