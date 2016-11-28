var myLayout = new dhtmlXLayoutObject({
  parent: "layoutObj",
  pattern: "3E",   // <-- pattern
    
  offsets: {          // optional, offsets for fullscreen init
       top:    10,     // you can specify all four sides
       right:  10,     // or only the side where you want to have an offset
       bottom: 10,
       left:   10
   },

   cells: [    // optional, cells configuration according to the pattern
               // you can specify only the cells you want to configure
               // all params are optional
       {
           id:             "a",        // id of the cell you want to configure
           text:           "Text",     // header text
           collapsed_text: "Text 2",   // header text for a collapsed cell
           header:         false,      // hide header on init
           width:          100,        // cell init width
           height:         100,        // cell init height
           collapse:       true,        // collapse on init
           fix_size:       [true,null] // fix cell's size, [width,height]
       }

   ]
});


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
