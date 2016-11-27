$(document).ready(function() {
  function include(url) {
       var script = document.createElement('script');
       script.src = url;
       document.getElementsByTagName('body')[0].appendChild(script);
   }
  var financeWindow;
  //вспомогательные функции
  include("/js/utils.js");
  //Редактор оплат
  include("/js/financeEditor.js");
  //События клавиатуры
  include("/js/keyEvent.js");
  //Инструменты масштабирования
  include("/js/scale.js"); 

  include("/js/ganttConfig.js");
  include("/js/gantEvents.js");
  //Дополнительные настройки
  include("/js/gantFeatures.js");
  //Инициализация диаграммы
  include("/js/script.js");
});
