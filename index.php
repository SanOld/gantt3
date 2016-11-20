<?php
  if( $curl = curl_init() ) {
    curl_setopt($curl, CURLOPT_URL, 'http://esoftdsc.bget.ru/smeta3007/loaders/get_smeta_json.php');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "project=".$_GET['project']);
    $out = curl_exec($curl);
    curl_close($curl);
  }
  
//  print_r($_GET['$out']);
//  die();
  
if($out){
  $project = $out;
} else {
  $project = json_encode('{"data":[{"id":1,"name":"Отсутствуют данные","text":"Отсутствуют данные", "start_date":"16.11.2016", "duration":"10","type":"task"}]}');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  
<script>
   var project = <?php echo($project); ?> 
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


