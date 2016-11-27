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
                       ,'nomencl_id'
                       ,'project_id'
                       ,'smeta_id'
                       ,'deadline'
                       ,'type'
                       ,'resource_type'
                       ,'ed_izm'
                       ,'resource_amount'
                       ,'hours'
                       ,'mancount'
                       ,'description'
                       ,'sortorder'
                    );
	return implode ( ',', $columns );
}

$gantt->mix("open", 1);

$gantt->render_table(TBL_RESOURCE,"id",getTaskColumns(),"" );

?>
