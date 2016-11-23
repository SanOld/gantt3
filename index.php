<?php //

if(isset($_GET['project']) && gettype($_GET['project']) == "string"){
  $project = $_GET['project'];
} else {
  $project = "undefined";
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
 <script>
   var project = <?php echo $project; ?>;
 </script>
 
<?php include('head.php'); ?>

</head>
<body>
<div id="page">
  <?php include('menu.php'); ?>
  
</div>
<div class="clearfix"></div>  
<div id="gantt_here"></div>

<div class="footer">
  <div class="container">
    <div class="col-lg-7">
      <a href="" class="pull-left m-t-10">
        <img src="">
      </a>
    </div>
  </div>
</div>
<div class="md-overlay"></div>

</body>

</html>


