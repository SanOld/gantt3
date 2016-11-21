<?php
 
include('config.php');

include ('../dhtmlxGantt_v4.1.0/codebase/connector/gantt_connector.php');
include ('../dhtmlxGantt_v4.1.0/codebase/connector/db_pdo.php');

 
$gantt = new JSONGanttConnector($res, "PDO");
 
$gantt->mix("open", 1);
//$gantt->enable_order("sortorder");
 

$gantt->render_table(TBL_GANTT,"id", "start_date,duration,text,progress", "");
//$gantt->render_links(TBL_LINKS, "id", "source,target,type");

?>
