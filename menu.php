<nav class="navbar navbar-default header-nav m-b-0">
	<div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="navbar navbar-inverse">
            <div class="container">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">CAD5D. Календарное планирование</a>
              </div>
              <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                  <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Проект <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="#">Инфомация</a></li>
                      <li><a href="#">Настройка</a></li>
                      <li class="divider"></li>
                      <li><a href="#">Экспорт в PDF</a></li>
                    </ul>
                  </li>
                  <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Задача <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="#">Добавить задачу</a></li>
                      <li><a href="#">Добавить ресурс</a></li>
                      <li class="divider"></li>
                      <li><a href="#">Настройка</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>    
      <div class="row">
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <label >Критический путь</label>
            <div class="input-group">
<!--            <span class="input-group-addon">
              <input id="criticalPath" type="checkbox" checked>
            </span>-->
            <input id="criticalPath" type="batton" class="form-control show-path" value="Скрыть" readonly> 
            </div>
          </div>
        </div> 
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <label >Кол-во рабочих</label>
            <div class="input-group">
            <input id="mancount" type="batton" class="form-control show-path" value="Отобразить" readonly> 
            </div>
          </div>
        </div>         
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <label >По дате начала</label>
            <select id="dateFilter" class="form-control" >
              <option value="all">Все</option>
              <option value="today">Сегодня</option>
              <option value="tomorrow">Завтра</option>
              <option value="week">Текущая неделя</option>
            </select>
          </div>
        </div> 
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <label >По типу задачи</label>
            <select id="taskTypeFilter" class="form-control" >
              <option value="all">Все</option>
              <option value="task">Задачи</option>
              <option value="resource">Ресурсы</option>
            </select>
          </div>
        </div>
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <label ></label>
            <div class="input-group">
            <input id="exportPDF" type="batton" class="form-control show-path" value="Экспорт в PDF" readonly> 
            </div>
          </div>
        </div>
        <div class="col-lg-2 m-t-10 m-b-10">

        </div>
        
      </div>  
      <div class="row">
        <form>
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="dayScale" type="radio" name="scale" value="1" checked>
            </span>
            <input  type="batton" class="form-control" value="День" readonly> 
            </div>
          </div>
        </div>
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="weekScale" type="radio" name="scale" value="2">
            </span>
            <input  type="batton" class="form-control" value="Неделя" readonly> 
            </div>
          </div>
        </div>
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="monthScale" type="radio" name="scale" value="3" >
            </span>
            <input  type="batton" class="form-control" value="Месяц" readonly> 
            </div>
          </div>
        </div>
        <div class="col-lg-2 m-t-10 m-b-10">
          <div class="input-group">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="yearScale" type="radio" name="scale" value="4">
            </span>
            <input  type="batton" class="form-control" value="Год" readonly> 
            </div>
          </div>
        </div>
        <div class="col-lg-3 m-t-10 m-b-10">
          <div class="input-group">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="zoomToFit" type="radio" name="scale" value="5">
            </span>
            <input  type="batton" class="form-control" value="Подобрать масштаб" readonly> 
            </div>
          </div>
        </div> 
        </form>   
      </div> 
	</div>   
</nav>
