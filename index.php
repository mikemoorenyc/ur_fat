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

$startTime =  strtotime($now->format('Y-m-d 00:00:00 O'));
$endTime = strtotime($now->format('Y-m-d 23:59:59 O'));

$query = "SELECT * FROM posts WHERE post_date BETWEEN $startTime AND $endTime ORDER BY post_date DESC";
$today_posts = mysqli_query($db_conn, $query);
if($today_posts) {
  while ($row = $today_posts->fetch_assoc()) {
     $rows[] = $row;
   }
}
if(!empty($rows)):?>
<ul>
<?php foreach($rows as $r):?>
  <?php
  $_SESSION['deltoken_'.$r['id']] = genToken(); 
  
  ?>
  <li>
    <h2><?= $r['post_title'];?></h2>
    <form method="POST" action="delete-item.php">
      <input type="hidden" name="delete_id" value="<?=$r['id'];?>" />
      <input type="hidden"  name="noonce_key" value="deltoken_<?= $r['id'];?>" />
      <input type="hidden"  name="<?='deltoken_'.$r['id'];?>" value="<?=$_SESSION['deltoken_'.$r['id']];?>" />
      <button type="submit">Delete</button>
    </form>

  </li>


<?php endforeach;?>

</ul>



<?php endif;?>
