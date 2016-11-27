document.onkeydown=function(e){return Do(e||window.event,(e||window.event).keyCode);};
function Do(e, kode){

    switch (kode){
        case 27://esc
        if (typeof financeWindow == 'object' && financeWindow.unload != null) {
          financeWindow.unload();
          financeWindow = null;
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