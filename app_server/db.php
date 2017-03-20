<?php

/* db constants */

define('DB_HOST', 'localhost');
define('DB_USER', 'root'); //innakhx4_gantt
define('DB_PASSWORD', ''); //gantt_1

define('DB_DATABASE', 'innakhx4_gantt'); //innakhx4_gantt

/* TABLES */
define('TBL_GANTT', 'user_smeta'); //innakhx4_gantt
define('TBL_RESOURCE', 'resources2'); //innakhx4_gantt
define('TBL_LINKS', 'gantt_links'); //innakhx4_gantt
define('TBL_PAYMENT', 'plan_payment'); //innakhx4_gantt

// Mysql
$dbtype = "PDO";

//$res = new PDO ( "mysql:dbname=" . DB_DATABASE . ";host=" . DB_HOST, DB_USER, DB_PASSWORD );
$res = new PDO ( "mysql:dbname=" . DB_DATABASE . ";host=" . DB_HOST, DB_USER, DB_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );
//mysql_select_db(DB_DATABASE);
