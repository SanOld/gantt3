  
var defaultHours = 8;
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
{name: "text",       label: "Наименование",  tree:true, width:230, template:customTaskName},
{name: "start_date", label: "Начало",         align: "center" },
{name: "deadline",   label: "Крайний срок",      align: "center",  width: 90},
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


//options resources type to lightbox  
for (var i in resource_type){
  opt_resource.push({key:resource_type[i], label :resource_type[i]});
}
//lightbox.sections
gantt.config.lightbox.sections = [
   {name: "description", height:70, map_to:"text", type:"textarea", focus:true}
  ,{name: "hours", height:30, type:"template",    map_to:"hours_template"}
  ,{name: "manhours", height:30, type:"template", map_to:"manhours_template"}
  ,{name: "mancount", height:30, type:"template", map_to:"mancount_template"}
  ,{name: "resource_type", height:30, type:"select",  options: opt_resource}
  ,{name: "time",     height:30, type:"duration", map_to:"auto"}
  ,{name: "deadline", type: "duration", map_to: {start_date:"deadline"}, single_date: true}
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
  return task.unit ? task.unit : "";
};
function customTaskName(task){
  if(task.type == 'resource')
      return "<div class='resource'>" + task.text + "</div>";
  return task.text;
};
function getManCount(task){
  return task.mancount ? task.mancount : 1;
};
function getManHours(task){
  var hours = task.hours || defaultHours;
  return task.manhours ? task.manhours : task.duration * hours;
};

function getHours(task){
  return task.hours ? task.hours : defaultHours;
};


