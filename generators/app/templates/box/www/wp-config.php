<?php
$site =  str_replace('.','-',$_SERVER['HTTP_HOST']);
require_once __DIR__ . '/' . $site . '/wp-config.php';

if ( defined( 'WP_CLI' ) && WP_CLI ) {
    /* That's all, stop editing! Happy blogging. */

    /** Absolute path to the WordPress directory. */
    if ( !defined('ABSPATH') )
        define('ABSPATH', dirname(__FILE__) . '/');

    /** Sets up WordPress vars and included files. */
    require_once(ABSPATH . 'wp-settings.php');
}

