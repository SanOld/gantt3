$(document).ready(function() {
  
  var filter_start;
  var filter_end;
  var filter_task_type = "";

  var today = new Date();
  var day = today.getDay();
  var monday = getDateAgo(today,-day+1);
  var sunday = getDateAgo(today, day+5);
  filter_start = getDateAgo(today,-10000);
  filter_end = getDateAgo(today,10000);
  
  include("/js/scale.js");
  
  gantt.attachEvent("onBeforeLightbox", function(id) { 
    var task = current_task = gantt.getTask(id);
    task.hours_template = "<input type='number' class='hours'  step='0.5' min='0.5' value=" + getHours(task) + ">";
    task.manhours_template = "<input type='number' class='manhours'  step='0.1'  value=" + getManHours(task) + ">";
    task.mancount_template = "<input type='number' class='mancount'  step='0.1'  value=" + getManCount(task) + ">";
    return true
  }); 
    
  gantt.attachEvent("onLightbox", function (task_id){
    currentTask = gantt.getTask(task_id);
    var task = gantt.getTask(task_id);
    
    var node_hours = gantt.getLightboxSection('hours').node
    var hours = $(node_hours).find('input');
    var node_manhours = gantt.getLightboxSection('manhours').node
    var manhours = $(node_manhours).find('input');

    var node_mancount = gantt.getLightboxSection('mancount').node
    var mancount = $(node_mancount).find('input');
    
    var node_new_duration = gantt.getLightboxSection('time').node;
    var new_duration = $(node_new_duration).find('.gantt_duration_value');
    
    var node_resource_type = gantt.getLightboxSection('resource_type').node;
    var new_resource_type = $(node_resource_type).find('select');
    
    $(new_resource_type).on('change', function(e){
      task.resource_type = gantt.getLightboxSection('resource_type').getValue();
    });   
    
    $('.hours').on('change', function(e){
      new_duration.val((manhours.val()/mancount.val()/hours.val()));
      task.manhours = e.target.value;
      task.duration = new_duration.val();
    });
    $('.manhours').on('change', function(e){
      new_duration.val((manhours.val()/mancount.val()/hours.val()));
      task.manhours = e.target.value;
      task.duration = new_duration.val();
    });
    $('.mancount').on('change', function(e){
      new_duration.val((manhours.val()/mancount.val()/hours.val()));
      task.mancount = e.target.value;
      task.duration = new_duration.val();
    });    
 
    $('.gantt_duration_dec').on('click', function(){
      mancount.val((manhours.val()/new_duration.val()/hours.val()).toFixed(2)); 
      task.mancount = mancount.val();
    }) 
    $('.gantt_duration_inc').on('click', function(){
      mancount.val((manhours.val()/new_duration.val()/hours.val()).toFixed(2)); 
      task.mancount = mancount.val();
    })
  });
  
	gantt.attachEvent("onTaskLoading", function(task){
		if(task.deadline){
      task.deadline = gantt.date.parseDate(task.deadline, "xml_date");
    } else {
      task.deadline = task.end_date;
    }
    if(task.type == "resource"){
      task.resource_type = task.resource_type ? task.resource_type : "Материал";;
    }     
		return true;
	});

  //Filter
  gantt.attachEvent("onBeforeTaskDisplay", function(id, task){

      var condition1 = (task.start_date - filter_start) > -86400000;
      var condition2 = (task.start_date - filter_end) < 86400000;
      var condition3 = true;
      if(filter_task_type != ""){
        condition3 = (task.type == filter_task_type);
      } 

      if ((condition1 && condition2)&& condition3){        
          return true;
      }
      return false;
  });


  gantt.init("gantt_here");
//  gantt.parse(project5, "json");
//  gantt.parse(project5, "json");
//  gantt.parse(project);
//  gantt.load("../app/data.php");

  if(project != undefined){
    gantt.load("../app/data.php?connector=true&dhx_filter[project_id]=" + project);    
  } else {
    gantt.load("../app/data.php");
  }
  var dp = new gantt.dataProcessor("../app/data.php");
  dp.init(gantt);
  

  //Events
  $('#criticalPath').on('click', function(){
      gantt.config.highlight_critical_path = !gantt.config.highlight_critical_path;
      if(gantt.config.highlight_critical_path){
        gantt.config.highlight_critical_path = true;
        $(this).val("Скрыть");
      }else{
        gantt.config.highlight_critical_path = false;
        $(this).val("Отобразить");
      }
      gantt.render();   
  })
  $('#mancount').on('click', function(){
      gantt.config.showManCount = !gantt.config.showManCount;
      if(gantt.config.showManCount){
        gantt.config.showManCount = true;
        $(this).val("Скрыть");
      }else{
        gantt.config.showManCount = false;
        $(this).val("Отобразить");
      }
      gantt.render();   
  })  
  $('#dateFilter').on('change', function(el){
    var val = $( this ).find('option:selected').val(); 
      switch (val) {
        case "today":
          filter_start = today;
          break;
        case "tomorrow":
          filter_start = getDateAgo(today,1);
          break;
        case "week":
            filter_start  = monday;
            filter_end    = sunday;
            break;
          default:
            filter_start = getDateAgo(today,-1000);
            filter_end = getDateAgo(today,1000);
            break;
      }

   gantt.render();
  })
  $('#taskTypeFilter').on('change', function(el){
    var val = $( this ).find('option:selected').val(); 
      switch (val) {
        case "task":
          filter_task_type = "task";
          break;
        case "resource":
          filter_task_type = "resource";
          break;
        default:
          filter_task_type = "";
          break;
      }

   gantt.render();
  })
  
  $('#exportPDF').on('click', function(){
    gantt.exportToPDF({raw:true});
  });
  $('input[name=scale]').on('change', function(e){
    switch (e.target.value) {
      case '5':
//        saveConfig();
        zoomToFit();
        break;
      default:
        setScaleConfig(e.target.value);
        gantt.render();
        break;
    }
    
  });
  
  $('.save').on('click', function(){

    dp.sendAllData();

  });

//Utils
  function getDateAgo(date, days) {
    var new_date = new Date();
    new_date.setDate(date.getDate() + days);
    return new_date;
  }
  function include(url) {
       var script = document.createElement('script');
       script.src = url;
       document.getElementsByTagName('head')[0].appendChild(script);
   }
});