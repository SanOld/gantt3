//var myLayout = new dhtmlXLayoutObject({
//  parent: "layoutObj",
//  pattern: "3E",   // <-- pattern
//    
//  offsets: {          // optional, offsets for fullscreen init
//       top:    10,     // you can specify all four sides
//       right:  10,     // or only the side where you want to have an offset
//       bottom: 10,
//       left:   10
//   },
//
//   cells: [    // optional, cells configuration according to the pattern
//               // you can specify only the cells you want to configure
//               // all params are optional
//       {
//           id:             "a",        // id of the cell you want to configure
//           text:           "Text",     // header text
//           collapsed_text: "Text 2",   // header text for a collapsed cell
//           header:         false,      // hide header on init
//           width:          100,        // cell init width
//           height:         100,        // cell init height
//           collapse:       true,        // collapse on init
//           fix_size:       [true,null] // fix cell's size, [width,height]
//       }
//
//   ]
//});

var mainWins = new dhtmlXWindows();

var main = mainWins.createWindow("main", 20, 30, 300, 200);
mainWins.attachViewportTo(document.getElementById('bd'));
mainWins.window('main').keepInViewport(true);
mainWins.window('main').maximize();



main.setText("CAD5D. Календарное планирование");
main.button("close").disable();
main.button("minmax").disable();

var myMenu = main.attachMenu();
myMenu.loadFromHTML("mainMenu", true);
 
myMenu.addRadioButton('child', 'm121', 1, 'm1211', 'Все', 'filter_type', true, false);
myMenu.addRadioButton('child', 'm121', 2, 'm1212', 'Задачи', 'filter_type', false, false);
myMenu.addRadioButton('child', 'm121', 3, 'm1213', 'Ресурсы', 'filter_type', false, false);          
          
myMenu.addRadioButton('child', 'm122', 1, 'm1221', 'Все', 'filter_time', true, false);
myMenu.addRadioButton('child', 'm122', 2, 'm1222', 'Сегодня', 'filter_time', false, false);
myMenu.addRadioButton('child', 'm122', 3, 'm1223', 'Завтра', 'filter_time', false, false);
myMenu.addRadioButton('child', 'm122', 4, 'm1224', 'Текущая неделя', 'filter_time', false, false);

myMenu.addCheckbox('child', 'm2', 6, 'm25', 'Критический путь', false, false);
myMenu.addCheckbox('child', 'm2', 7, 'm26', 'Таблица задач', false, false);
myMenu.addCheckbox('child', 'm2', 8, 'm27', 'Количество работников', false, false);

myMenu.addRadioButton('child', 'm24', 1, 'm241', 'День', 'scale', true, false);
myMenu.addRadioButton('child', 'm24', 2, 'm242', 'Неделя', 'scale', false, false);
myMenu.addRadioButton('child', 'm24', 3, 'm243', 'Месяц', 'scale', false, false);
myMenu.addRadioButton('child', 'm24', 4, 'm244', 'Год', 'scale', false, false);
myMenu.addRadioButton('child', 'm24', 5, 'm245', 'Подобратьмасштаб', 'scale', false, false);


myMenu.attachEvent("onClick", function(id, zoneId, cas){
  switch (id) {
    case 'm41'://export
      gantt.exportToPDF({raw:true});
      break;
//    case 'm61'://indent
//      alert('indent')
//      gantt.performAction('indent');
//      break;
//    case 'm62'://outdent
//      alert('outdent')
//      gantt.performAction('outdent');
//      break;    
    case 'm11'://График финансирования
    case 'm13'://свойства
    case 'm21'://
    case 'm31'://
    case 'm32'://
    case 'm61'://
    case 'm62'://  
    case 'm41'://    
    case 'm42'://   
    case 'm51'://    
    case 'm52'://         
      gantt.message({text:'Функционал в разработке',type: 'alert', expire: 10000});
      break;  
  }

});
myMenu.attachEvent("onCheckboxClick", function(id, state, zoneId, cas){
  switch (id) {
    case 'm25'://Критический путь
      gantt.config.highlight_critical_path = !state;      
      break;
    case 'm26'://Таблица задач
      gantt.config.show_grid = !state;      
      break;
    case 'm27'://Количество работников
      gantt.config.showManCount = !state;
        break;  
  }
  // zoneId used for context menu
//  var casText = "";
//  for (var a in {ctrl:1,alt:1,shift:1}) casText += " "+a+"="+(cas[a]==true?"true":"false");
//  gantt.message({text:"<b>onCheckboxClick</b> id="+id+", current state is "+(state?"true":"false")+", "+casText+"<br>", type:"default", expire:-1});
  gantt.render();
  return true; // allow state to be changed
});
myMenu.attachEvent("onRadioClick", function(group, idChecked, idClicked, zoneId, cas){
  if(group == 'filter_type' && idChecked != idClicked){
    switch (idClicked) {
      case 'm1211':
        filter_task_type = "";
        break;
      case 'm1212':
        filter_task_type = "task";
        break;
     case 'm1213':
        filter_task_type = "resource";
        break; 
    }
  }
  if(group == 'filter_time' && idChecked != idClicked){
    switch (idClicked) {
      case 'm1221'://all
          filter_start = getDateAgo(today,-1000);
          filter_end = getDateAgo(today,1000);
          break;      
      case "m1222"://today
        filter_start = today;
        break;
      case "m1223"://tomorrow
        filter_start = getDateAgo(today,1);
        break;
      case "m1224"://week
          filter_start  = monday;
          filter_end    = sunday;
          break;
    }
  }
  if(group == 'scale' && idChecked != idClicked){
    switch (idClicked) {
      case 'm241': 
//      saveConfig();
        zoomToFit();
        break;
      case 'm242':
        setScaleConfig('1');
        break;
      case 'm243':
        setScaleConfig('2');
        break; 
      case 'm244':
        setScaleConfig('3');
        break;
      case 'm245':
        setScaleConfig('4');
        break;        
    }
  }
   gantt.render();
   return true;
  // zoneId used for context menu
//  var casText = "";
//  for (var a in {ctrl:1,alt:1,shift:1}) casText += " "+a+"="+(cas[a]==true?"true":"false");
//  gantt.message({text:"<b>onRadioClick</b> group="+group+", checked id="+idChecked+", clicked id="+idClicked+", "+casText+"<br>",type:"default", expire:-1});
//  return true; // allow state to be changed
});



var mainToolbar = main.attachToolbar({
  icons_path: "../imgs/",
  xml: "../../xml/toolbars/task_finance_toolbar.xml"
});



mainWins.window('main').attachHTMLString('<div id="gantt_here"></div>');

//mainWins.setViewport(0,0,'100%','100%',"layoutObj")




  gantt.init("gantt_here");

var dataProc = new gantt.dataProcessor("../app/dataGantProcessor.php");
  dataProc.init(gantt);
  dataProc.attachEvent("onBeforeUpdate", function (id, status, data) {
  //      window.console.log(data);
       data.workload = data.manhours;
       if(data.type =='resource' && ('nomenckl_id' in data )){
         data.nomenckl_id == data.parent;
       }
       return true;
  });

//  gantt.parse(project5, "json");
//  gantt.parse(project5, "json");
//  gantt.parse(project_id);
//  gantt.load("../app/data.php");

  var projectHeader = {data:[]};
  projectHeader.data.push({id:project_id, text:project, start_date:"2016-11-25 00:00:00", duration:1, open: true, type: "project"});

  for(var i in smeta) {
    projectHeader.data.push({id:i, text:smeta[i], start_date:"2016-11-25 00:00:00", duration:1, open: true, type: "smeta", parent: project_id, smeta_id: i, project_id: project_id})
  };
  
  gantt.parse(projectHeader);

  for(var i in smeta) {
    gantt.load("../app/dataGantTask.php?connector=true&dhx_filter[project_id]=" + project_id + "&dhx_filter[smeta_id]=" + i);
    setTimeout(loadResource,1000,project_id,i);

  };
function loadResource(){
  gantt.load("../app/dataGantResource.php?connector=true&dhx_filter[project_id]=" + project_id + "&dhx_filter[smeta_id]=" + i);
}
  if(project_id != undefined){
    gantt.message({text:"Проект :" + project_id,type:"default",expire:2000});
  } else {
    gantt.message({text:"Данные проекта отсутствуют ",type:"error",expire:-1});
    gantt.message({text:"Загрузка примера ",type:"error",expire:-1});
    gantt.parse(project5, "json");
  }
  
  gantt.message({text:"Режим :" + env,type:"error",expire:-1});
   

  
//
