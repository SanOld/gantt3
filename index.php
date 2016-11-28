<?php //
include('app/config.php');
if(isset($_GET['project_id']) && gettype($_GET['project_id']) == "string"){
  $project_id = $_GET['project_id'];
} else {
  $project_id = "undefined";
}

if(isset($_GET['project']) && gettype($_GET['project']) == "string"){
  $project= $_GET['project'];
} else {
  $project = "undefined";
}

if(isset($_GET['smeta']) ){
  $smeta= json_encode($_GET['smeta']);
} else {
  $smeta = [];
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
 <script>
   var project_id = "<?php echo $project_id; ?>";
   var project = "<?php echo $project; ?>";
//   var smeta = {};
   smeta = <?php echo($smeta); ?>;
   var env = '<?php echo ENV; ?>';
 </script>

<?php include('head.php'); ?>

</head>
<body id="bd">

  

  
  
  
<div id="page">
  <?php include('menu.php'); ?>
</div>
 
  




<div class="md-overlay"></div>

<!--TEMPLATES-->
	<div class="templates">
		<div class="user_add">
			<div class='dhx_cal_ltext' style='height: 60px;'>
				<div class="add-user-form">
					<input type="text" class="user_add input-sm" /> <span
						class="user-add-action btn btn-small btn-info">+</span>
				</div>
			</div>
		</div>
		<div class="user-custom-menu">

			<div class="btn gantt_options_menu" onclick="customMenuAction(this)">
				<i class="fa fa-plus gantt_options_menu_img"></i>
			</div>
			<div class="btn gantt_options_menu" type="button"
				onclick="customMenuAction(this)">
				<i class="fa fa-cog gantt_options_menu_edit"
					onclick="customMenuActionEdit(this,{{- rc.id}})"></i>
			</div>
		</div>
		<div class="user-custom-delete-menu">
			<div class="gantt_options_menu" type="button"
				onclick="customMenuAction(this)">
				<i class="fa fa-times gantt_options_menu_edit"
					onclick="customMenuActionDel({{- rc.id}})"></i>
			</div>
		</div>
    
    <div class="finance-button" task="{{- rc.id}}">
      <div class="gantt_options_menu" type="button"
        onclick="customMenuAction(this)">
				<i class="fa fa-usd gantt_options_menu_edit"
        onclick="getFinanceEditor({{- rc.id}})"></i>
			</div>
		</div>
  
		<div class="user-grid-select">
			<span class="user-name"
				onclick="clickGridButton({{rc.id}}, \'edit\', this)"><{{rc.user}}</span>
		</div>
	</div>
<!--TEMPLATES-->


</body>

</html>


