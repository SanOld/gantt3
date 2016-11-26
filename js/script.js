
var dhxWins;
function getFinanceEditor(taskId){
  var task = gantt.getTask(taskId);
  var taskId = taskId;
  
      var w1, myGrid;
      var filter = false;
      dhxWins = new dhtmlXWindows();
      
      
//			dhxWins.attachViewportTo("winVP");
      var width = 500;
      var height = 500;
      var left = ($(window).width() - width)/2;
      var right = ($(window).height() - height)/2;
      
			w1 = dhxWins.createWindow('paymentPlan', left, right, width, height);
      dhxWins.window('paymentPlan').setModal(true);
      dhxWins.window('paymentPlan').keepInViewport(true);
      w1.setText("План оплат. " + task.text);
//			w1.button("close").disable();
      var myToolbar = w1.attachToolbar({
				icons_path: "../imgs/",
				xml: "../../xml/toolbars/task_finance_toolbar.xml"
			});

			//

			myGrid = w1.attachGrid();
			myGrid.setImagePath("../dhtmlxSuite_v50_std/codebase/imgs/");
      
      myGrid.setHeader("TaskId,Дата платежа,Сумма");

//      myGrid.attachHeader(",#text_filter,#text_filter");
			myGrid.setInitWidths("0,*,*");
      myGrid.set
      myGrid.setColAlign("center,center,center");
      myGrid.enableAutoWidth(true);
			
			myGrid.setColTypes("ro,dhxCalendarA,edn");
      myGrid.setColumnHidden(0,true); //hides the 1st column
      myGrid.setDateFormat("%Y-%m-%d");
      myGrid.setNumberFormat("0,000.00");
      myGrid.setColSorting("str,date,int");
      myGrid._in_header_stat_sum=function(tag,index,data){       
          var calck=function(){                              
              var sum=0;                                     
              this.forEachRow(function(id){                   
                  sum+=this.cellById(id,index).getValue()*1;     
              })
          return this._aplNF(sum,0);
          }
          this._stat_in_header(tag,calck,index,data);            
      }
      myGrid.attachFooter(",,Общая сумма: {#stat_total}");
      myGrid.init();
      
      myGrid.load("../app/dataGridFinance.php?connector=true&dhx_filter[task_id]=" + taskId);

      myToolbar.attachEvent("onClick", function(id) {
        switch (id) {
        case "add":
          myGrid.addRow(myGrid.uid(),[taskId,,],0);   
          myGrid.selectCell(0,1);
          setTimeout(func,50);
          break;
        case "delete":
          myGrid.deleteRow(myGrid.getSelectedRowId())
          break;
      case "save":
          myDataProcessor.sendAllData();
          gantt.message({type:"error", text:"Данные сохранены!"});
          break;  
      case "search":
          filter=!filter;
          if(filter){
            myGrid.attachHeader(",#text_filter,#text_filter");
          } else {
            myGrid.detachHeader(1);
          }
          myGrid.refresh();
          break;  
      }
			});
      
      function func() {
        myGrid.editCell();
      }
      
      var myDataProcessor = new dataProcessor("../app/dataGridFinance.php?task_id=" + taskId); // lock feed url
//      myDataProcessor.setTransactionMode("GET", false);
      myDataProcessor.init(myGrid); // link dataprocessor to the grid

    
      
};


$(document).ready(function() {
// gantt.message({text:val,expire:-1}); 
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
  
  include("/js/scale.js"); 
  include("/js/contex_menu.js");
  
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
//{name: "custom_menu", label: gantt.locale.labels.grid_menu, align: 'center', resize: false, width: 144, template: getCustomMenu, },
{name: "text",       label: "Наименование",   tree:true, width:230, template:customTaskName},
{name: "start_date", label: "Начало",         align: "center",  width: 90},
{name: "deadline",   label: "Крайний срок",   align: "center",  width: 90},
{name: "duration",   label: "Длительность",   align: "center",  width: 80 },

{name: "type",       label: "Тип",            align: "center",  width: 40,    template:getTaskType},
{name: "resource_type",       label: "Тип ресурса",    align: "center",  width: 80,    template:getResourceType},
{name: "amount",       label: "Кол-во",         align: "right",   width: 60,    template:getResorceAmount},
{name: "unit",       label: "Ед.изм.",        align: "left",    width: 40,    template:getResourceUnit},
{name: "mancount",       label: "Рабочие",        align: "center",  width: 60,    template:getManCount},
{name: "anhours",       label: "Трудоемкость",   align: "center",  width: 80,    template:getManHours},
{name: "finance",    label: "",               align: 'center', resize: false, template:getFinanceTemplate, width: 45 },
{name:"add",         label:"",           width:44 },
];
columns_template = gantt._serialize_columns(gantt.config);
  window.console.log(columns_template);
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

function getCustomMenu(task) {
	var html = templates.render('.user-custom-menu', {
		id : task.id,
	});
	return html;
}
//function getCustomDeleteMenu(task) {
//	var html = templates.render('.templates .user-custom-delete-menu', {
//		id : task.id,
//		user : task.user
//	});
//	return html;
//}

function getFinanceTemplate(task) {
//	var html = templates.render('.templates .finance-button', {
//		id : task.id,
//	});
//	return html;
  var text="";
   text+= "<div class='finance-button' task='{{- rc.id}}'>"
   text+=    "<div class='gantt_options_menu' type='button'>"
	 text+=			"<i class='fa fa-usd gantt_options_menu_edit'"
   text+=      "onclick='getFinanceEditor(" + task.id + ")'></i>"
	 text+=		"</div>"
	 text+=	"</div>"
   return text;
  
}

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
      case 'ed_izm':
        result = (param in task) ? task[param] : defaultValue.ed_izm;
        break;  
    }
  return result; 
};


 //========================
 //========================
 //========================
  gantt.attachEvent("onBeforeLightbox", function(id) { 
    var task = current_task = gantt.getTask(id);
    task.hours_template = "<input type='number' class='hours'  step='0.5' min='0.5' value=" + getParam(task, 'hours') + ">";
    task.manhours_template = "<input type='number' class='manhours'  step='0.1'  value=" + getParam(task, 'manhours') + ">";
    task.mancount_template = "<input type='number' class='mancount'  step='0.1'  value=" + getParam(task, 'mancount') + ">";
    task.resource_amount_template = "<input type='number' class='mancount'  step='0.1'  value=" + getParam(task, 'resource_amount') + ">";
    task.ed_izm_template = "<input type='text' class='mancount'     value=" + getParam(task, 'ed_izm') + ">";
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
    
    var node_ed_izm = gantt.getLightboxSection('ed_izm').node;
    var new_ed_izm = $(node_ed_izm).find('select');
     
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


//gantt.config.show_grid = false;
  //Init
  gantt.init("gantt_here");

//  gantt.parse(project5, "json");
//  gantt.parse(project5, "json");
//  gantt.parse(project_id);
//  gantt.load("../app/data.php");

    var header = {data:[]};
    header.data[0] = {id:project_id, text:project, start_date:"13-11-2016", duration:1, open: true, type: "project"};
    if(smeta.lenght > 0){
      smeta.forEach(function(item, i, smeta) {
        header.data.push({id:i, text:item, start_date:"13-11-2016", duration:1, open: true, type: "smeta", parent: project_id})
      });
      gantt.parse(header);
      smeta.forEach(function(item, i, smeta) {
        gantt.load("../app/dataGantTask.php?connector=true&dhx_filter[project_id]=" + project_id + "&dhx_filter[smeta_id]=" + i);
        gantt.load("../app/dataGantResource.php?connector=true&dhx_filter[project_id]=" + project_id + "&dhx_filter[smeta_id]=" + i);
      });
    }
    gantt.message({text:project_id,type:"error",expire:-1});
  if(project_id != undefined){
    gantt.message({text:"Проект :" + project_id,type:"default",expire:-1});
  } else {
    gantt.message({text:"Данные проекта отсутствуют ",type:"error",expire:-1});
    gantt.message({text:"Загрузка примера ",type:"error",expire:-1});
    gantt.parse(project5, "json");
  }
  
  gantt.message({text:"Режим :" + env,type:"error",expire:-1});
  var dp = new gantt.dataProcessor("../app/dataGantProcessor.php"); 
//  ?connector=true&dhx_filter[project_id]=" + 57 + "&dhx_filter[smeta_id]=" + 56
  dp.init(gantt);
//
    dp.attachEvent("onBeforeUpdate", function (id, status, data) {
//      window.console.log(data);
       data.workload = data.manhours;
       return true;
  });

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
    $('#hideGrid').on('click', function(){
      gantt.config.show_grid = !gantt.config.show_grid;
      if(gantt.config.show_grid){
        gantt.config.show_grid = true;
        $(this).val("Скрыть");
      }else{
        gantt.config.show_grid = false;
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
  
//Utils
  function getDateAgo(date, days) {
    var new_date = new Date();
    new_date.setDate(date.getDate() + days);
    return new_date;
  }
  function include(url) {
       var script = document.createElement('script');
       script.src = url;
       document.getElementsByTagName('body')[0].appendChild(script);
   }
   
function templateRenders() {
	function render(template, data) {
		var tpl_status = false;
		var params_status = false;
		if (data) {
			params_status = true;
		}
		if (template) {
			tpl_status = true;
		}
		if (tpl_status == true) {
			_.templateSettings = {
				evaluate : /\{\{(.+?)\}\}/g,
				interpolate : /\{\{=(.+?)\}\}/g,
				escape : /\{\{-(.+?)\}\}/g
			};
			_.templateSettings.variable = "rc";
			var tpl = _.template(jQuery(template).html());
		}
		return tpl(data);
		if (tpl_status == true && params_status == true) {
			return tpl(data);
		} else {
			return tpl(data);
		}

	}
	return {
		render : render
	}
}
var templates = new templateRenders();



});


document.onkeydown=function(e){return Do(e||window.event,(e||window.event).keyCode);};
function Do(e, kode){

    switch (kode){
        case 27://esc
        if (dhxWins != null && dhxWins.unload != null) {
          dhxWins.unload();
          dhxWins = null;
        }
                break;
        case 46://delete
                break;
        case 8://backspace
 
                break;
        case 50://2

                break;
        default:
//                alert(kode);
                break;  
    }
    return true;
}