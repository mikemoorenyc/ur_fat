<?php
date_default_timezone_set('UTC');
session_start();

include 'func_genToken.php';


require 'db_connect.php';
if($need_to_install) {
  die('<a href="install.php">Install URFAT</a>');
}
 ?>
