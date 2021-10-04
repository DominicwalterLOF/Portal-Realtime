function updateTime(){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    document.getElementById("time").innerHTML = today.toLocaleDateString("en-US", options);
  }
  
  function addLOGCard(progress, date, title, sub, note){
  
    ma = "<div class='project-box-wrapper'><div class='project-box' style='background-color: #748cab;'><div class='project-box-header'><span>" + date 
          + '</span><div class="more-wrapper"><button class="project-btn-more"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg></button></div></div><div class="project-box-content-header"><p class="box-content-header">'
          + title + '</p><p class="box-content-subheader">' + sub + '</p></div><div class="box-progress-wrapper"><p class="box-progress-header">Progress</p><div class="box-progress-bar"><span class="box-progress"></span></div><p class="box-progress-percentage">'
          + progress + '</p><br> </div> <div class="project-box-footer"><div class="participants"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant"><img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant">     <button class="add-participant" style="color: #34c471;">       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">         <path d="M12 5v14M5 12h14" />       </svg>     </button>   </div>   <div class="days-left" style="color: #34c471;"></div>'
          + note + '</div></div></div></div>';
  
    document.getElementById("loglogs").innerHTML += ma;
  
  }
  
  function trycard(){
    addLOGCard("80%","October 2","This is a title","we are a team","new project")
  }
  
  updateTime();
  
  document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    modeSwitch.addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    });
    
    var listView = document.querySelector('.list-view');
    var gridView = document.querySelector('.grid-view');
    var projectsList = document.querySelector('.project-boxes');
    
    listView.addEventListener('click', function () {
      gridView.classList.remove('active');
      listView.classList.add('active');
      projectsList.classList.remove('jsGridView');
      projectsList.classList.add('jsListView');
    });
    
    gridView.addEventListener('click', function () {
      gridView.classList.add('active');
      listView.classList.remove('active');
      projectsList.classList.remove('jsListView');
      projectsList.classList.add('jsGridView');
    });
    
    document.querySelector('.messages-btn').addEventListener('click', function () {
      document.querySelector('.messages-section').classList.add('show');
    });
    
    document.querySelector('.messages-close').addEventListener('click', function() {
      document.querySelector('.messages-section').classList.remove('show');
    });
  });