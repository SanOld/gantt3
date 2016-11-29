$(document).ready(function() {
  function include(url) {
       var script = document.createElement('script');
       script.src = url;
       script.async = false;
       document.getElementsByTagName('body')[0].appendChild(script);
   }
  var financeWindow;
  //вспомогательные функции




  include("/js/utils.js?"+hash);
  //Редактор оплат
  include("/js/financeEditor.js?"+hash);
  //События клавиатуры
  include("/js/keyEvent.js?"+hash);
  //Инструменты масштабирования
  include("/js/scale.js?"+hash); 

  include("/js/ganttConfig.js?"+hash);
  include("/js/gantEvents.js?"+hash);
  //Дополнительные настройки
  include("/js/gantFeatures.js?"+hash);
  //Инициализация диаграммы
  include("/js/script.js?"+hash);

});
