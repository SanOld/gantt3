<?php
 
include('db.php');
include ('gantt_connector.php');
include ('db_pdo.php');

 
$gantt = new JSONGanttConnector($res, "PDO");

function getTaskColumns() {
	$columns = array (
                        'start_date'
                       ,'duration'
                       ,'name'
                       ,'parent'
                       ,'progress'
                       ,'parent'
                       ,'project_id'
                       ,'smeta_id'
                       ,'deadline'
                       ,'type'
                       ,'resource_type'
                       ,'ed_izm'
                       ,'resource_amount'
                       ,'hours'
                       ,'workload'
                       ,'mancount'
                       ,'description'
                       ,'progress'
                       ,'sortorder'
                    );
	return implode ( ',', $columns );
}

 
$gantt->mix("open", 1);
//$gantt->filter("smeta_id","1");
//$gantt->enable_order("sortorder");
$gantt->render_links(TBL_LINKS, "id", "source,target,type");
$gantt->render_table(TBL_GANTT,"id",getTaskColumns(),"" );


?>
