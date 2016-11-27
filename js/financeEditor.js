function getFinanceEditor(taskId){
  var task = gantt.getTask(taskId);
  var taskId = taskId;
  
      var w1, myGrid;
      var filter = false;
      financeWindow = new dhtmlXWindows();
      
      
//			financeWindow.attachViewportTo("winVP");
      var width = 500;
      var height = 500;
      var left = ($(window).width() - width)/2;
      var right = ($(window).height() - height)/2;
      
			w1 = financeWindow.createWindow('paymentPlan', left, right, width, height);
      financeWindow.window('paymentPlan').setModal(true);
      financeWindow.window('paymentPlan').keepInViewport(true);
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



