function getParam(task, val){
  var result = "";
  var param = val;
    switch (param) {
      case 'hours':
        result = (param in task) ? task[param] : defaultValue.hours;
        break;
      case 'manhours':
        var hours = task.hours || defaultValue.hours;
        result = (param in task) ? task[param] : task.duration * hours;
        break;
      case 'mancount':
        result = (param in task) ? task[param] : 1;
        break; 
      case 'resource_amount':
        result = (param in task) ? task[param] : defaultValue.resource_amount;
        break;
      case 'ed_izm':
        result = (param in task) ? task[param] : defaultValue.ed_izm;
        break;  
    }
  return result; 
};

gantt.attachEvent("onBeforeLightbox", function(id) { 
  
  var task = current_task = gantt.getTask(id);
  alert(task.type)
  gantt.getLightboxSection('name').setValue(task.name);
  task.hours_template = "<input type='number' class='hours'  step='0.5' min='0.5' value=" + getParam(task, 'hours') + ">";
  task.manhours_template = "<input type='number' class='manhours'  step='0.1'  value=" + getParam(task, 'manhours') + ">";
  task.mancount_template = "<input type='number' class='mancount'  step='0.1'  value=" + getParam(task, 'mancount') + ">";
  task.resource_amount_template = "<input type='number' class='mancount'  step='0.1'  value=" + getParam(task, 'resource_amount') + ">";
  task.ed_izm_template = "<input type='text' class='ed_izm'     value=" + getParam(task, 'ed_izm') + ">";
  return true
}); 
gantt.attachEvent("onLightboxSave", function(id, item, is_new){
  window.console.log(item);
  if(is_new);{
    var parent_task = gantt.getTask(item.parent);
    item.smeta_id = parent_task.smeta_id;
    item.project_id = parent_task.project_id;
  }
  var node_hours = gantt.getLightboxSection('hours').node
  var hours = $(node_hours).find('input');

  var node_manhours = gantt.getLightboxSection('manhours').node
  var manhours = $(node_manhours).find('input');

  var node_mancount = gantt.getLightboxSection('mancount').node
  var mancount = $(node_mancount).find('input');

  var node_new_duration = gantt.getLightboxSection('time').node;
  var new_duration = $(node_new_duration).find('.gantt_duration_value');

  var node_resource_amount = gantt.getLightboxSection('resource_amount').node;
  var new_resource_amount = $(node_resource_amount).find('input');

  var node_ed_izm = gantt.getLightboxSection('ed_izm').node;
  var new_ed_izm = $(node_ed_izm).find('input');
  
  
  item.name = gantt.getLightboxSection('name').getValue();
  item.hours = hours.val();
  item.manhours = manhours.val();
  item.mancount = mancount.val();
  item.duration = new_duration.val();
  item.resource_amount = new_resource_amount.val();
  item.ed_izm = new_ed_izm.val();
  return true;
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
  if("nomencl_id" in task){
    task.parent = task.nomencl_id;
  } 

  if("start_date" in task){
    task.start_date = (Math.abs(task.start_date-today) < 946080000 && (task.start_date != undefined)) ? task.start_date : gantt.date.parseDate(today,"xml_date");

  } else {
    task.start_date = gantt.date.parseDate(today,"xml_date");
  }

  if("duration" in task){
    task.duration = ((+task.duration != 0) && (task.duration != undefined)) ? task.duration : +defaultValue.duration;
    task.end_date = gantt.date.add(task.start_date, +task.duration,'day');
  } else {
    task.duration = +defaultValue.duration;
    task.end_date = gantt.date.add(task.start_date, +task.duration,'day');
  }

  if("deadline" in task){
    task.deadline = ((+task.deadline != 0) && (task.deadline != undefined)) ? gantt.date.parseDate(task.deadline, "xml_date") : task.deadline = gantt.date.add(task.start_date, +task.duration,'day');
  } else {
    task.deadline = gantt.date.add(task.start_date, +task.duration,'day');
  }  

  task.resource_type = ("resource_type" in task) ? task.resource_type : defaultValue.resource_type;
  task.hours = ("hours" in task) ? task.hours : defaultValue.hours;
  task.manhours = ("workload" in task) ? task.workload : defaultValue.manhours;
  task.mancount = ("mancount" in task) ? task.mancount : defaultValue.mancount;
  task.resource_amount = ("resource_amount" in task) ? task.resource_amount : defaultValue.resource_amount;
  task.ed_izm = ("ed_izm" in task) ? task.ed_izm : defaultValue.ed_izm;
  task.parent = ("parent" in task) && +task.parent != 0 ? task.parent : task.smeta_id;
//    window.console.log(task.start_date-today);
  return true;
});
gantt.attachEvent("onTaskCreated", function(task){
    //any custom logic here
    task.type = 'task';
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


  //Events
//$('#criticalPath').on('click', function(){
//    gantt.config.highlight_critical_path = !gantt.config.highlight_critical_path;
//    if(gantt.config.highlight_critical_path){
//      gantt.config.highlight_critical_path = true;
//      $(this).val("Скрыть");
//    }else{
//      gantt.config.highlight_critical_path = false;
//      $(this).val("Отобразить");
//    }
//    gantt.render();   
//})
//$('#hideGrid').on('click', function(){
//    gantt.config.show_grid = !gantt.config.show_grid;
//    if(gantt.config.show_grid){
//      gantt.config.show_grid = true;
//      $(this).val("Скрыть");
//    }else{
//      gantt.config.show_grid = false;
//      $(this).val("Отобразить");
//    }
//    gantt.render();   
//})
//$('#mancount').on('click', function(){
//    gantt.config.showManCount = !gantt.config.showManCount;
//    if(gantt.config.showManCount){
//      gantt.config.showManCount = true;
//      $(this).val("Скрыть");
//    }else{
//      gantt.config.showManCount = false;
//      $(this).val("Отобразить");
//    }
//    gantt.render();   
//})  
//$('#dateFilter').on('change', function(el){
//  var val = $( this ).find('option:selected').val(); 
//    switch (val) {
//      case "today":
//        filter_start = today;
//        break;
//      case "tomorrow":
//        filter_start = getDateAgo(today,1);
//        break;
//      case "week":
//          filter_start  = monday;
//          filter_end    = sunday;
//          break;
//        default:
//          filter_start = getDateAgo(today,-1000);
//          filter_end = getDateAgo(today,1000);
//          break;
//    }
//
// gantt.render();
//})
//$('#taskTypeFilter').on('change', function(el){
//  var val = $( this ).find('option:selected').val(); 
//    switch (val) {
//      case "task":
//        filter_task_type = "task";
//        break;
//      case "resource":
//        filter_task_type = "resource";
//        break;
//      default:
//        filter_task_type = "";
//        break;
//    }
//
// gantt.render();
//})
//$('#exportPDF').on('click', function(){
//  gantt.exportToPDF({raw:true});
//});
//$('input[name=scale]').on('change', function(e){
//  switch (e.target.value) {
//    case '5':
////        saveConfig();
//      zoomToFit();
//      break;
//    default:
//      setScaleConfig(e.target.value);
//      gantt.render();
//      break;
//  }
//
//});
