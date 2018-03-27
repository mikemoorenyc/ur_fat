<?php
date_default_timezone_set('UTC');
session_start();
/*
include 'func_genToken.php';
include 'func_user_check.php';
include 'func_request_check.php';
include 'func_check_remember_me.php';
*/
$dir = new DirectoryIterator('/global_functions');
foreach ($dir as $i) {
    if($i->getExtension() !== 'php' || !$i->isFile()) {
     continue;
    }
    include_once $i->getPathname();
}

require 'db_connect.php';
if($need_to_install) {
  die('<a href="install.php">Install URFAT</a>');
}
 ?>
