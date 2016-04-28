<?php
$site =  str_replace('.','-',$_SERVER['HTTP_HOST']);
if ('wplib-box' === $site) {
    include __DIR__ . '/admin.php';
}
else {
    include __DIR__ . '/' . $site . '/index.php';
}
