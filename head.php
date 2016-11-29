<?php
$dir1 = "js/";
//
$files_array = dirlist($dir1);
$hash = md5(implode(':',$files_array));

// возвращает массив всех файлов директории вкл файлы пддиректорий
function dirlist($dir){ 
  
  $files = [];
  
  if (@is_dir($dir)) {
    $opendir = opendir($dir);
      while ( ($filename = readdir($opendir)) !== false )
      {
        if($filename != '.' && $filename != '..'){
          $isDir = @is_dir($dir . $filename . "/");
          if ($isDir == false)
          {
              $fileHash = filemtime(strtolower($dir . $filename));
              $files[] = $fileHash;
          } else {
             $files = array_merge($files, dirlist($dir . $filename . "/"));
          }
        }
      }
      closedir($opendir);
  }
   return $files;
}
// возвращает массив всех файлов директории
function filelist($dir){
  $files=[];
  
  $opendir = opendir($dir);

  while ($filename = readdir($opendir))
  {

      $isDir = @is_dir($dir . $filename . '/');
      if ($isDir == false)
      {
          $fileHash = filemtime(strtolower($dir . $filename));
          $files[] = $fileHash;
      } 
  }

  closedir($opendir);

  return $files;
}
?>
<title>Диаграмма Ганта</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport" content="width=1280">
<meta name="description" content="">
<meta name="author" content="">
<base href="/">
<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
<link href="css/bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

<link href="dhtmlxSuite_v50_std/codebase/dhtmlx.css" rel="stylesheet">
<!--<link href="css/dhtmlx.css" rel="stylesheet">-->
<link href="css/skins/terrace/dhtmlx.css" rel="stylesheet">

<link href="dhtmlxGantt_v4.1.0/codebase/dhtmlxgantt.css" rel="stylesheet">
<!--<link href="css/dhtmlxgantt_terrace.css" rel="stylesheet">-->

<!--<link href="css/font-awesome.css" rel="stylesheet">-->
<link href="css/helper.css?<?php echo $hash;?>" rel="stylesheet">
<link href="css/style.css?<?php echo $hash;?>" rel="stylesheet">

<script src="js/lib/jquery-latest.js"></script>
<script src="js/lib/jquery-ui-latest.js"></script>
<script src="js/lib/bootstrap.min.js"></script>

<script src="dhtmlxSuite_v50_std/codebase/dhtmlx.js"></script>
<script src="dhtmlxGantt_v4.1.0/codebase/sources/dhtmlxgantt.js"></script>
<script src="dhtmlxSuite_v50_std/codebase/dhtmlx_deprecated.js"></script>

<script src="js/lib/api.js"></script>
<script src="js/lib/dhtmlxgantt_critical_path.js?<?php echo $hash;?>"></script>
<script src="js/lib/redefine_dhtmlxGantt.js?<?php echo $hash;?>"></script>
<script src="js/lib/dhtmlxgantt_multiselect.js?<?php echo $hash;?>"></script>

<script src="js/test_data.js"></script>
<script src="js/utils/underscore.js"></script>
<script src="js/init.js?<?php echo $hash;?>"></script>
<script> var hash = "<?php echo $hash;?>"; </script>





