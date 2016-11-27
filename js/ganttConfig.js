// gantt.message({text:val,expire:-1}); 
var dataProcessor = new gantt.dataProcessor("../app/dataGantProcessor.php");

var defaultValue = {
    hours : 8
  , manhours : 8
  , mancount : 1
  , duration : 1
  , resource_amount : 1
  , ed_izm : "шт"
  , resource_type : "Материал"
};

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
{name: "start_date", label: "Начало",         align: "center",  width: 90},
{name: "deadline",   label: "Крайний срок",   align: "center",  width: 90},
{name: "duration",   label: "Длительность",   align: "center",  width: 80 },

{name: "type",       label: "Тип",            align: "center",  width: 40,    template:getTaskType},
{name: "resource_type",       label: "Тип ресурса",    align: "center",  width: 80,    template:getResourceType},
{name: "amount",       label: "Кол-во",         align: "right",   width: 60,    template:getResorceAmount},
{name: "ed_izm",       label: "Ед.изм.",        align: "left",    width: 40,    template:getResourceUnit},
{name: "mancount",       label: "Рабочие",        align: "center",  width: 60,    template:getManCount},
{name: "anhours",       label: "Трудоемкость",   align: "center",  width: 80,    template:getManHours},
{name: "finance",    label: "",               align: 'center', resize: false, template:getFinanceTemplate, width: 45 },
{name:"add",         label:"",           width:44 },
];

//=======================================
function customTaskName(task){
  if(task.type == 'resource')
      return "<div class='resource'>" + task.text + "</div>";
  return task.text;
};
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
    return task.ed_izm ? task.ed_izm : "шт";
  }
  return "";
};
function getManCount(task){
  return task.mancount ? task.mancount : "1";
};
function getManHours(task){
  return task.manhours ? task.manhours : defaultValue.hours;
};
function getFinanceTemplate(task) {
  var text="";
   text+= "<div class='finance-button' task='{{- rc.id}}'>"
   text+=    "<div class='gantt_options_menu' type='button'>"
	 text+=			"<i class='fa fa-usd gantt_options_menu_edit'"
   text+=      "onclick='getFinanceEditor(" + task.id + ")'></i>"
	 text+=		"</div>"
	 text+=	"</div>"
   return text;
}
//=======================================

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
gantt.templates.task_cell_class = function(task, date){
  if(!gantt.isWorkTime(date))
    return "week_end";
  return "";
};



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
gantt.locale.labels.section_ed_izm = "Ед.изм.";


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
  ,{name: "ed_izm",           height:30, type:"template",   map_to:"ed_izm_template"}
  ,{name: "time",             height:30, type:"duration",   map_to:"auto"}
  ,{name: "deadline",                    type: "duration",  map_to: "deadline", single_date: true}
];
