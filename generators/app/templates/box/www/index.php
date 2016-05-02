<?php
$site =  str_replace('.','-',$_SERVER['HTTP_HOST']);
include __DIR__ . '/' . $site . '/index.php';
