$(document).ready(function() {
// gantt.message({text:val,expire:-1}); 
var defaultValue = {
    hours : 8
  , manhours : 8
  , mancount : 1
  , duration : 1
  , resource_amount : 1
  , resource_edizm : "шт"
  , resource_type : "Материал"
};


var resource_type = ["Материал", "Оборудование", "Интсрумент"]; // array resources type
var opt_resource = []; //options resources type to lightbox
var current_task = {};
//  gantt.config.xml_date = "%d-%m-%Y";
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";

gantt.config.columns=[
{name: "overdue", label: "", width: 38, template: function (obj) {
    if (obj.deadline) {
      var deadline = gantt.date.parseDate(obj.deadline, "xml_date");
      if (deadline && obj.end_date > deadline) {
        return '<div class="overdue-indicator">!</div>';
      }
    }
    return '<div></div>';
  }
},    
{name: "text",       label: "Наименование",   tree:true, width:230, template:customTaskName},
{name: "start_date", label: "Начало",         align: "center" },
{name: "deadline",   label: "Крайний срок",   align: "center",  width: 90},
{name: "duration",   label: "Длительность",   align: "center",  width: 80 },

{name: "text",       label: "Тип",            align: "center",  width: 40,    template:getTaskType},
{name: "text",       label: "Тип ресурса",    align: "center",  width: 80,    template:getResourceType},
{name: "text",       label: "Кол-во",         align: "right",   width: 60,    template:getResorceAmount},
{name: "text",       label: "Ед.изм.",        align: "left",    width: 40,    template:getResourceUnit},
{name: "text",       label: "Рабочие",        align: "center",  width: 60,    template:getManCount},
{name: "text",       label: "Трудоемкость",   align: "center",  width: 80,    template:getManHours},

{name:"add",          label:"",           width:44 },
];

gantt.config.types.task = "task";
gantt.config.types.resource = "resource";

//css template for each task type
gantt.templates.task_class = function (start, end, task) {
  var result = "";
  switch (task.type) {
    case gantt.config.types.task:
      result = 'task';
      break;
    case gantt.config.types.resource:
      result = 'resource';
      break;
    default:
      result = 'resource';
      break;
  }

  if (task.deadline && end.valueOf() > task.deadline.valueOf()) {
  result = result + ' overdue';
  }    

  return result;
};

gantt.templates.task_row_class = function(start_date, end_date, task) {
  if (task.type  == 'resource') return "green";
}; 

gantt.templates.grid_row_class = gantt.templates.task_class ;

gantt.config.preserve_scroll = true; 
gantt.config.autosize = true;
// ordering tasks only inside a branch
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
gantt.config.highlight_critical_path = true; 

gantt.locale.labels.section_description = "Описание";
gantt.locale.labels.section_time = "Дата начала / Длительность, дней";
gantt.locale.labels.section_mancount = "Количество рабочих, чел.";
gantt.locale.labels.section_manhours = "Трудозатраты, чел./час";
gantt.locale.labels.section_hours = "Кол-во часов в день";
gantt.locale.labels.section_deadline = "Крайний срок";
gantt.locale.labels.section_resource_type = "Тип ресурса";
gantt.locale.labels.section_resource_amount = "Количество ресурса";
gantt.locale.labels.section_resource_edizm = "Ед.изм.";


//options resources type to lightbox  
for (var i in resource_type){
  opt_resource.push({key:resource_type[i], label :resource_type[i]});
}
//lightbox.sections
gantt.config.lightbox.sections = [
   {name: "description",      height:70, type:"textarea",   map_to:"description", focus:true}
  ,{name: "hours",            height:30, type:"template",   map_to:"hours_template"}
  ,{name: "manhours",         height:30, type:"template",   map_to:"manhours_template"}
  ,{name: "mancount",         height:30, type:"template",   map_to:"mancount_template"}
  ,{name: "resource_type",    height:30, type:"select",     map_to:"resource_type", options: opt_resource}
  ,{name: "resource_amount",  height:30, type:"template",   map_to:"resource_amount_template"}
  ,{name: "resource_edizm",   height:30, type:"template",   map_to:"resource_edizm_template"}
  ,{name: "time",             height:30, type:"duration",   map_to:"auto"}
  ,{name: "deadline",                    type: "duration",  map_to: {start_date:"deadline"}, single_date: true}
];


//=====deadline
gantt.addTaskLayer(function draw_deadline(task) {
if (task.deadline) {
  var el = document.createElement('div');
  el.className = 'deadline';
  var sizes = gantt.getTaskPosition(task, task.deadline);

  el.style.left = sizes.left + 'px';
  el.style.top = sizes.top + 'px';

  el.setAttribute('title', gantt.templates.task_date(task.deadline));

  return el;
}
return false;
});

//===========fit_task_text
(function(){
gantt.config.font_width_ratio = 7;
gantt.templates.leftside_text = function leftSideTextTemplate(start, end, task) {
  if (getTaskFitValue(task) === "left") {
    return task.text;
  }
  return "";
};

gantt.templates.rightside_text = function rightSideTextTemplate(start, end, task) {
  var result = "";

  if (task.deadline) {
    if (end.valueOf() > task.deadline.valueOf()) {
      var overdue = Math.ceil(Math.abs((end.getTime() - task.deadline.getTime()) / (24 * 60 * 60 * 1000)));

      var result = "<b>Опоздание: " + overdue + " дней</b>";
    }
  }

  task.mancount = task.mancount ? task.mancount : 1;

  if (getTaskFitValue(task) === "right") {
    result = result + " " + task.text
  }
  if(gantt.config.showManCount && task.type != "resource"){
    result = result + "<span style='text-align:left;'> "+task.mancount+ " чел. </span>"
  };     

  return result;
};

gantt.templates.task_text = function taskTextTemplate(start, end, task){
  if (getTaskFitValue(task) === "center") {
    return task.text;
  }
  return "";
};

function getTaskFitValue(task){
  var taskStartPos = gantt.posFromDate(task.start_date),
    taskEndPos = gantt.posFromDate(task.end_date);

  var width = taskEndPos - taskStartPos;
  var textWidth = (task.text || "").length * gantt.config.font_width_ratio;

  if(width < textWidth){
    var ganttLastDate = gantt.getState().max_date;
    var ganttEndPos = gantt.posFromDate(ganttLastDate);
    if(ganttEndPos - taskEndPos < textWidth){
      return "left"
    }
    else {
      return "right"
    }
  }
  else {
    return "center";
  }
}
})();
//===========fit_task_text

//=======================================
//function getTaskDeadline(task){
//  return true;
////return task.deadline ? task.deadline : task.end_date;
//};
function getTaskType(task){
  var text = "";
  switch (task.type) {
    case "task":
      text = "Задача";
      break;
    case "resource":
      text = "Ресурс";
      break;
  }
  return "<i class='type'>" + text + "</i>";
};
function getResorceAmount(task){
  return task.resource_amount ? task.resource_amount : "";
};
function getResourceType(task){
  if(task.type == "resource"){
    var text = task.resource_type ? task.resource_type : "";
    return "<i class='type'>" + text + "</i>";
  } 
  return "";
};
function getResourceUnit(task){
  if(task.type == "resource"){
    return task.unit ? task.unit : "шт";
  }
  return "";
};
function getManCount(task){
  return task.mancount ? task.mancount : "1";
};
function getManHours(task){
  return task.manhours ? task.manhours : defaultValue.hours;
};
function customTaskName(task){
  if(task.type == 'resource')
      return "<div class='resource'>" + task.text + "</div>";
  return task.text;
};
function getHours(task){
  return task.hours ? task.hours : defaultValue.hours;
};
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
      case 'resource_edizm':
        result = (param in task) ? task[param] : defaultValue.resource_edizm;
        break;  
    }
  return result; 
};


 //========================
 //========================
 //========================
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
    task.hours_template = "<input type='number' class='hours'  step='0.5' min='0.5' value=" + getParam(task, 'hours') + ">";
    task.manhours_template = "<input type='number' class='manhours'  step='0.1'  value=" + getParam(task, 'manhours') + ">";
    task.mancount_template = "<input type='number' class='mancount'  step='0.1'  value=" + getParam(task, 'mancount') + ">";
    
    task.resource_amount_template = "<input type='number' class='mancount'  step='0.1'  value=" + getParam(task, 'resource_amount') + ">";
    task.resource_edizm_template = "<input type='text' class='mancount'     value=" + getParam(task, 'resource_edizm') + ">";
    
    return true
  }); 
  gantt.attachEvent("onLightboxSave", function(id, item, is_new){

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
    
    var node_resource_edizm = gantt.getLightboxSection('resource_edizm').node;
    var new_resource_edizm = $(node_resource_edizm).find('select');
     
    item.hours = hours.val();
    item.manhours = manhours.val();
    item.mancount = mancount.val();
    item.duration = new_duration.val();
    item.resource_amount = new_resource_amount.val();
    item.resource_edizm = new_resource_edizm.val();
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
		if("deadline" in task){
      task.deadline = gantt.date.parseDate(task.deadline, "xml_date");
    } else {
      task.deadline = task.end_date;
    }
    task.resource_type = ("resource_type" in task) ? task.resource_type : defaultValue.resource_type;
    task.hours = ("hours" in task) ? task.hours : defaultValue.hours;
    task.manhours = ("manhours" in task) ? task.manhours : defaultValue.manhours;
    task.mancount = ("mancount" in task) ? task.mancount : defaultValue.mancount;
    task.duration = ("duration" in task) ? task.duration : defaultValue.duration;
    task.resource_amount = ("resource_amount" in task) ? task.resource_amount : defaultValue.resource_amount;
    task.resource_edizm = ("resource_edizm" in task) ? task.resource_edizm : defaultValue.resource_edizm;
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



  //Init
  gantt.init("gantt_here");
//  gantt.parse(project5, "json");
//  gantt.parse(project5, "json");
//  gantt.parse(project);
//  gantt.load("../app/data.php");

  if(project != undefined){
    gantt.message({text:"Проект :" + project,type:"default",expire:-1});
    gantt.load("../app/data.php?connector=true&dhx_filter[project_id]=" + project);    
  } else {
    gantt.message({text:"Данные проекта отсуствуют",type:"error",expire:-1});
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