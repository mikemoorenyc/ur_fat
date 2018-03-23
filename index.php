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
<label for="item_title">Food</label>
<input type="text" required id="item_title" name="item_title" />
<label for="item_amount">Amount</label>
<INPUT type="text" id="item_amount" name="item_amount" />
<label for="item_description">Notes</label>
<textarea id="item_description" name="item_description"></textarea>
<label for="item_date">When</label>
<input type="datetime-local" />
<button type="submit">Add Item</button>

</form>
