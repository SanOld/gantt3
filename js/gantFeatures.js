//=====deadline (переопределен)
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


//=======context menu
(function addContentMenu(){
  var menu = new dhtmlXMenuObject();
//			menu.setIconsPath("../common/sample_images/");
  menu.renderAsContextMenu();
//			menu.setSkin("dhx_terrace");

  var columnsWidth = {};
  var columns = gantt.getGridColumns();
  for(var i in columns){
    columnsWidth[columns[i].name] = columns[i].width;
  }

  gantt.attachEvent("onContextMenu", function(taskId, linkId, event){
    var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

    var target = (event.target || event.srcElement);
    var column_id = target.getAttribute("column_id");
    menu.clearAll();

    addColumnsConfig();
    if(column_id){
      addColumnToggle(column_id);
    }

    menu.showContextMenu(x, y);
    return false;
  });

  //pro
  gantt.getGridColumn = function(column_id){
    var columns = gantt.getGridColumns();
    for(var i in columns){
      if(column_id == columns[i].name){
        return columns[i];
      }
    }
  }
  //pro

  menu.attachEvent("onClick", function(id, zoneId, cas){
    var parts = (id + "").split("#");
    var is_toggle = parts[0] == "toggle",
      column_id = parts[1] || id;

    var column = gantt.getGridColumn(column_id);
    if(column){
      var visible = !is_toggle ? menu.getCheckboxState(id) : false;
      column.hide = !visible;
//          if (column.hide ){
//            column.width=0;
//          } else{
//            column.width = columnsWidth[column.name];
//          }
      gantt.render();
    }
    return true;
  });

  function addColumnToggle(column_name){
    var column = gantt.getGridColumn(column_name);
    var label = getColumnLabel(column);

    //add prefix to distinguish from the same item in 'show columns' menu
    var item_id = "toggle#" + column_name
    menu.addNewChild(null, -1, item_id, "Hide '" + label + "'", false);
    menu.addNewSeparator(item_id);
  }

  function addColumnsConfig(){
    menu.addNewChild(null, -1, "show_columns", "Show columns:", false);
    var columns = gantt.config.columns;

    for(var i = 0; i < columns.length; i++){
      var checked = (!columns[i].hide),
        itemLabel = getColumnLabel(columns[i]);
      menu.addCheckbox("child", "show_columns", i, columns[i].name, itemLabel, checked);
    }
  }

  function getColumnLabel(column){
    if(column == null)
      return '';

    var locale = gantt.locale.labels;
    var text = column.label !== undefined ? column.label : locale["column_" + column.name];

    text = text || column.name;
    return text;
  }
})();
//=======context menu

	// indent-outdent implementation
	(function(){

		function shiftTask(task_id, direction) {
			var task = gantt.getTask(task_id);
			task.start_date = gantt.date.add(task.start_date, direction, "day");
			task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
			gantt.updateTask(task.id);
		}

		var actions = {
			"indent": function indent(task_id){
				var prev_id = gantt.getPrevSibling(task_id);
				while(gantt.isSelectedTask(prev_id)){
					var prev = gantt.getPrevSibling(prev_id);
					if(!prev) break;
					prev_id = prev;
				}
				if (prev_id) {
					var new_parent = gantt.getTask(prev_id);
					gantt.moveTask(task_id, gantt.getChildren(new_parent.id).length, new_parent.id);
					new_parent.type = gantt.config.types.project;
					new_parent.$open = true;
					gantt.updateTask(task_id);
					gantt.updateTask(new_parent.id);
					return task_id;
				}
				return null;
			},
			"outdent": function outdent(task_id){
				var cur_task = gantt.getTask(task_id);
				var old_parent = cur_task.parent;
				if (gantt.isTaskExists(old_parent) && old_parent != gantt.config.root_id){
					gantt.moveTask(task_id, gantt.getTaskIndex(old_parent)+1+gantt.getTaskIndex(task_id), gantt.getParent(cur_task.parent));
					if (!gantt.hasChild(old_parent))
						gantt.getTask(old_parent).type = gantt.config.types.task;
					gantt.updateTask(task_id);
					gantt.updateTask(old_parent);
					return task_id;
				}
				return null;
			},
			"del": function(task_id){
				gantt.deleteTask(task_id);
				return task_id;
			},
			"moveForward": function(task_id){
				shiftTask(task_id, 1);
			},
			"moveBackward": function(task_id){
				shiftTask(task_id, -1);
			}
		};
		var cascadeAction = {
			"indent":true,
			"outdent":true,
			"del":true
		};

		gantt.performAction = function(actionName){
			var action = actions[actionName];
			if(!action){
        return;
      }
				

			gantt.batchUpdate(function () {
				var updated = {};
        
//        var arrTasks = gantt.getSelectedTasks();
//        for (var i in arrTasks){
//          var task_id = arrTasks[i];
//          if(cascadeAction[actionName]){
//						if(!updated[gantt.getParent(task_id)]){
//							var updated_id = action(task_id);
//							updated[updated_id] = true;
//						}else{
//							updated[task_id] = true;
//						}
//					}else{
//						action(task_id);
//					}         
//        }
				gantt.eachSelectedTask(function(task_id){

					if(cascadeAction[actionName]){
						if(!updated[gantt.getParent(task_id)]){
							var updated_id = action(task_id);
							updated[updated_id] = true;
						}else{
							updated[task_id] = true;
						}
					}else{
						action(task_id);
					}
				});
			});
		};
   })();