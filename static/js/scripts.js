function createNotif(n){
  //extracting data for the notification
  let type = n.type;
  let icon = n.type;
  let closeBtn = n.closeBtn;
  let text = n.text;
  let position = n.position;

  let d = document.createElement('div');
  let topMargin = 0;

  d.classList.add("alert");

  // Add the position
  d.classList.add(position);

  // Check if there is already a notification in that area
  let e = document.querySelectorAll('.' + position);

  //get total height to keep the margin of new notification
  if(e.length){
    for(i = 0; i < e.length; i++){
      topMargin += e[i].offsetHeight + 10;
      // If there is only 1 div, adjust the margin for the next divs
      i == 0 ? topMargin += 10 : '';
    }
  } else {
    topMargin = 10;
  }

  d.style.top = topMargin + 'px';

  //add classes to alert notif
  switch(type){
    case 'success':
    d.classList.add("alert-success");
    break;
    case 'danger':
    d.classList.add("alert-danger");
    break;
    case 'info':
    d.classList.add("alert-info");
    break;
    case 'warning':
    d.classList.add("alert-warning");
    break;
  }

  // Add icon
  if(icon){
    d.classList.add('with-icon');
    d.innerHTML += `<i class="icon ion-md-`+icon+`"></i>`
  }

  //Add text to the notification
  let notifText = document.createElement('span');
  notifText.innerText = text;
  d.appendChild(notifText);

  // Check if it has a clos button
  if(closeBtn){
    d.classList.add('with-close');
    d.innerHTML += `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <i class="icon ion-md-close"></i>
  </button>`;
  }

  //add notification to the DOM
  document.body.appendChild(d);
  
  setTimeout(function(){
    d.classList.add('fade-in');
  }, 200);
}

function pushNotif(d, callback){
  let n = document.createElement('div');
  n.classList.add('notif');
  //n.classList.add('border-success');
  
  if(d.icon){
    n.innerHTML += `<i class="icon ion-md-`+ d.icon +` icon-`+ d.type +`"></i>`;
  } else {
    n.classList.add('without-icon');
  }

  // Add the text to the div
  n.innerHTML += `<span class="pl-2 ">`+ d.text +`</span>`;

  if(d.close){
    n.innerHTML += `<i class="icon ion-md-close" onclick="dismissNotif()"></i>`;
  }

  //check how many notifications are already present
  let notifs = document.querySelectorAll(".notif");

  let currentNotif = document.querySelector(".notif-front");
  let middleNotif = document.querySelector(".notif-middle");
  let lastNotif = document.querySelector(".notif-last");

  currentNotif ? currentNotif.classList.replace("notif-front","notif-middle") : '';
  middleNotif ? middleNotif.classList.replace("notif-middle","notif-last") : '';
  lastNotif ? lastNotif.classList.replace("notif-last","notif-out") : '';

  document.body.appendChild(n);

  setTimeout(function(){
    n.classList.add("notif-front");
    callback();
  }, 200);
}

function dismissNotif() {
  let currentNotif = document.querySelector(".notif-front");
  let middleNotif = document.querySelector(".notif-middle");
  let lastNotif = document.querySelector(".notif-last");

  let notifOut = document.querySelectorAll(".notif-out");

  if(currentNotif){
    currentNotif.classList.replace("notif-front","n");
    //Remove it after animating
    setTimeout(() => {
      currentNotif.remove();
    }, 300);
    
  }
  
  middleNotif ? middleNotif.classList.replace("notif-middle","notif-front") : '';
  lastNotif ? lastNotif.classList.replace("notif-last","notif-middle") : '';
  notifOut[notifOut.length - 1] ? notifOut[notifOut.length - 1].classList.replace("notif-out", "notif-last") : '';
}

$(document).ready(function() {
  var sidebarEl = $(".sidebar");
  var sidebarToggleBtn = $("#sidebarToggle");

  sidebarToggleBtn.click(function() {
    if ($(this).attr("rel") == "closeSearchBar") {
      $(this).attr("rel", "");
      $(".ham").removeClass("active");
      $(".searchBar").removeClass("active");
      return;
    }
    sidebarEl.hasClass("active") ? sidebarEl.removeClass("active") : sidebarEl.addClass("active");
  });

  // Hide Sidebar on click other than sidebar
  var containers = $(".sidebar, #sidebarToggle");
  $(document).click(function(e) {
    if(!containers.is(e.target) && containers.has(e.target).length === 0) {
      sidebarToggleBtn.addClass("hide");
      sidebarEl.removeClass("active");
    }
  });

  // Show search bar in mobile
  $("#navSearchButton").click(function() {
    sidebarToggleBtn.attr("rel", "closeSearchBar");
    $(".ham").addClass("active");
    $(".searchBar").addClass("active");
  });
});

// make the navbar white on scroll
$('.main-panel').scroll(function() {     
  var scroll = $('.main-panel').scrollTop();
  if (scroll > 60) {
    $("nav")
      .removeClass("navbar-dark")
      .addClass("shadow-sm bg-white navbar-light");
  } else {
    $("nav")
      .removeClass("shadow-sm navbar-light bg-white")
      .addClass("navbar-dark");
  }
});