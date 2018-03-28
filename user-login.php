<?php
require_once 'header.php';

$form_vars = array(
  'header' => 'Login Here',
  'noonce' => 'login_noonce',
  'action' => 'form-process-user-login.php',
  'email_label' => 'Email Address',
  'password_label' => "Password",
  "button_copy" => 'Submit',
  "account_button" => '<a href="user-login.php?action=create">Create an account</a>'
);

if($_GET['action'] === 'create') {
 $form_vars = array(
  'header' => 'Create your account',
  'noonce' => 'create_noonce',
   'action' => 'form-process-user-create.php',
   'email_label' => 'Email Address',
   'password_label' => "Create a password (min 5 characters)",
   "button_copy" => "Create your account",
   "account_button" => '<a href="user-login.php">Log into your account</a>'
 );
}

$_SESSION[$form_vars['noonce']] = generate_noonce();



?>
<h2><?= $form_vars['header'];?></h2>
<p><?=$_SESSION['login_alert'];?></p>
<?php
$_SESSION['login_alert'] = null;

 ?>
<form action="<?= $form_vars['action'];?>" method="POST">
  <input type="hidden" name="<?= $form_vars['noonce'];?>" value="<?= $_SESSION[$form_vars['noonce']];?>" />
  <label><?= $form_vars['email_label'];?></label><br/>
  <input type="text" name="email" />
  <br/><br/>
  <label><?= $form_vars['password_label'];?></label><br/>
  <input type="password" name="password" /><br/><br/>
  <button type="submit">Submit</button>
</form>

<?= $form_vars['account_button'];?>
