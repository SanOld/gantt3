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
