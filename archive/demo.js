function addnode(info){

    document.getElementById("timelinemain").innerHTML = info + document.getElementById("timelinemain").innerHTML;

}


function space(){
    in1 = '<li><div class="direction-r"><div class="flag-wrapper"><span class="flag"> <img src="https://freedesignfile.com/upload/2017/08/spaceship-icon-vector.png"alt="profile image"> Pilot 3</span><span class="time-wrapper"><span class="time">3:55 p.m.</span></span></div><div class="desc"><textarea style = "background: none; border:none; overflow:auto; height: 100px; width:300px;">This is a message received from Spacecraft</textarea></div></div></li>';
    addnode(in1);
}

function earth(){
    in1 = '<li><div class="direction-l"><div class="flag-wrapper"><span class="flag"> <img src="https://icon-library.com/images/icon-earth/icon-earth-14.jpg"alt="profile image">Chief Command</span><span class="time-wrapper"><span class="time">3:55 p.m.</span></span></div><div class="desc">This is a message received from Base Command Center </div></div></li>';
    addnode(in1);


}

$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
  
  