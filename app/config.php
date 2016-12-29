<?php
define('ENV', 'prod'); //prod or dev

switch ( ENV ) {
  case 'prod':
    define('DATA_HOST', 'http://esoftdsc.bget.ru/smeta3007/');
    define('GANTT_HOST', 'http://innakhx4.bget.ru/');
    break;
  case 'dev':
    define('DATA_HOST', 'http://gantt/');
    define('GANTT_HOST', 'http://gantt/');
    break;
}






