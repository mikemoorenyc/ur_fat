<?php

require_once 'header.php';


if(!$_SESSION['logged_in']) {
  $index_URL  = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  $base = str_replace('index.php','',$index_URL);
  header("Location: ".$base.'login/');
  die();
}
?>
<form id="add-item" method="POST" action="add-item.php">
  <?php $_SESSION['add_item_noonce'] = genToken(); ?>
  <input type="hidden" id="add_item_noonce" name="add_item_noonce" value="<?= $_SESSION['add_item_noonce'];?>" />
  <input type="hidden" id="add_noonce_key" name="noonce_key" value="add_item_noonce" />
  <label for="item_title">Food</label>
  <input type="text" required id="item_title" name="item_title" />
  <label for="item_amount">Amount</label>
  <INPUT type="text" id="item_amount" name="item_amount" />
  <label for="item_description">Notes</label>
  <textarea id="item_description" name="item_description"></textarea>
  <label for="item_date">When</label>
  <input type="datetime-local" name="item_date" name="item_date"/>
  <button type="submit">Add Item</button>

</form>
<?php
$now = new DateTime();
$ny_time  = new DateTimeZone('America/New_York');
$now->setTimezone($ny_time);

echo strtotime($now->format('Y-m-d 00:00:00 O')).'<br/><br/>';
echo strtotime($now->format('Y-m-d 23:59:59 O')).'<br/><br/>';
 ?>
