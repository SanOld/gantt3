<?php
  include('config.php');
  $val = $_POST[$_POST['ids']."_type"];
  if( $curl = curl_init() ) {
    if($val == "task"){
      curl_setopt($curl, CURLOPT_URL, DATA_HOST . 'app_server/dataGantTask.php?' . http_build_query($_GET));
    } else if($val == "resource"){
      curl_setopt($curl, CURLOPT_URL, DATA_HOST . 'app_server/dataGantResource.php?'.http_build_query($_GET));
    } else if(isset($_GET['gantt_mode']) && $_GET['gantt_mode'] == 'links') {
      curl_setopt($curl, CURLOPT_URL, DATA_HOST . 'app_server/dataGantTask.php?'.http_build_query($_GET));
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($_POST));
    $out = curl_exec($curl);
    curl_close($curl);
    print_r ($out);
  }

