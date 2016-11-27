(function(){
  gantt.init("gantt_here");
  dataProcessor.init(gantt);
//  gantt.parse(project5, "json");
//  gantt.parse(project5, "json");
//  gantt.parse(project_id);
//  gantt.load("../app/data.php");

  var projectHeader = {data:[]};
  projectHeader.data.push({id:project_id, text:project, start_date:"2016-11-25 00:00:00", duration:1, open: true, type: "project"});

  for(var i in smeta) {
    projectHeader.data.push({id:i, text:smeta[i], start_date:"2016-11-25 00:00:00", duration:1, open: true, type: "smeta", parent: project_id})
  };
  
  gantt.parse(projectHeader);

  for(var i in smeta) {
    gantt.load("../app/dataGantTask.php?connector=true&dhx_filter[project_id]=" + project_id + "&dhx_filter[smeta_id]=" + i);
    gantt.load("../app/dataGantResource.php?connector=true&dhx_filter[project_id]=" + project_id + "&dhx_filter[smeta_id]=" + i);
  };

  if(project_id != undefined){
    gantt.message({text:"Проект :" + project_id,type:"default",expire:2000});
  } else {
    gantt.message({text:"Данные проекта отсутствуют ",type:"error",expire:-1});
    gantt.message({text:"Загрузка примера ",type:"error",expire:-1});
    gantt.parse(project5, "json");
  }
  
  gantt.message({text:"Режим :" + env,type:"error",expire:-1});
   

  
//
})()