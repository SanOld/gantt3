<?php
 
//include('db.php');
include('db_library.php');
include ('grid_connector.php');
include ('db_pdo.php');

 
$grid = new GridConnector($res, "PDO");

function getTaskColumns() {
	$columns = array (
                    'task_id'
                    ,'plan_date'
                    ,'plan_sum'
                    );
	return implode ( ',', $columns );
}

 
$grid->mix("open", 1);
//$gantt->filter("smeta_id","1");
//$gantt->enable_order("sortorder");
$grid->render_table("plan_payment","id",getTaskColumns(),"" );
//$gantt->render_table(TBL_GANTT,"id","start_date,duration,text,parent,project_id","" );

?>
