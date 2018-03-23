<?php
require_once ('../header.php');

if($_SESSION['logged_in']) {
  die('<a href="logout.php">Log Out </a>');
}


$sql = "SELECT * FROM users LIMIT 1";
$result = mysqli_query($db_conn, $sql);

?>

<?php if(!empty($_SESSION['login_alert'])):?>
  <div class="<?= $_SESSION['login_alert']['type'];?>"><?= $_SESSION['login_alert']['content'];?></div>
<?php endif;?>
<?php
$_SESSION['login_alert'] = array();
$_SESSION['noonce_token'] = genToken();
 ?>

<?php
 if($result->num_rows < 1):?>
<?php



?>






<form id="create_account" method="POST" action="create_user.php">
  <input type="hidden" id="noonce" name="noonce" value="<?= $_SESSION['noonce_token'];?>" />
Give us your email address and pick a password to create an account <br/>
<label for="email">Email Address</label>
<input type="email" name="email" id="email" required maxlength="100"/>
<br/><br/>
<label for="password">Password (min 5 characters)</label>
<input type="password" name="password" id="password" required maxlength="255"/>
<br/><br/>
<button type="submit">Create Account</button>
</form>

<?php die(); endif; ?>
<form id="login_account" method="POST" action="login_user.php">
  <input type="hidden" id="noonce" name="noonce" value="<?= $_SESSION['noonce_token'];?>" />

<label for="email">Email Address</label>
<input type="email" name="email" id="email" required maxlength="100"/>
<br/><br/>
<label for="password">Password</label>
<input type="password" name="password" id="password" required maxlength="255"/>
<br/><br/>
<button type="submit">Log In</button>
</form>
