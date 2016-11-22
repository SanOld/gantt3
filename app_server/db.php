<?php

/* db constants */

define('DB_HOST', 'localhost');
define('DB_USER', 'root'); //innakhx4_gantt
define('DB_PASSWORD', ''); //gantt_1

define('DB_DATABASE', 'innakhx4_gantt'); //innakhx4_gantt

/* TABLES */
define('TBL_GANTT', 'gantt_tasks'); //innakhx4_gantt
define('TBL_LINKS', 'gantt_links'); //innakhx4_gantt
define('TBL_USERS', 'users'); //innakhx4_gantt

// Mysql
$dbtype = "MySQL";

$res = new PDO ( "mysql:dbname=" . DB_DATABASE . ";host=" . DB_HOST, DB_USER, DB_PASSWORD );
//mysql_select_db(DB_DATABASE);
