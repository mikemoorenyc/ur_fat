<?php
require_once 'header.php';

$form_vars = array(
  'header' => 'Login Here',
  'noonce' => 'login_noonce',
  'action' => 'process-user-login.php',
  'email_label' => 'Email Address',
  'password_label' => "Password",
  "button_copy" => 'Submit'
);

if($_GET['action'] === 'create') {
 $form_vars = array(
  'header' => 'Create your account',
  'noonce' => 'create_noonce',
   'action' => 'process-user-create.php',
   'email_label' => 'Email Address',
   'password_label' => "Create a password (min 5 characters)",
   "button_copy" => "Create your account"
 ); 
}

$_SESSION[$form_vars['noonce']] = generate_noonce();



?>
<h2><?= $form_vars['header'];?></h2>

<form action="<?= $form_vars['action'];?>" method="POST">
  <input type="hidden" name="<?= $form_vars['noonce'];?>" value="<?= $_SESSION[$form_vars['noonce']];?>" />
  <label><?= $form_vars['email_label'];?></label><br/>
  <input type="email" name="email" />
  <label><?= $form_vars['password_label'];?></label>
  <input type="password" name="password" />
  <button type="submit">Submit</button>
</form>
<br/><br/>
<a href="user-login.php?action=create">Create an account</a>
