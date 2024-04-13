
let usr_id = sessionStorage.getItem("usr_id");
fetch("https://spring-application.onrender.com/"+usr_id).then(res => res.json()).then(data => 
{sessionStorage.setItem("usr_name",data["name"]);
 sessionStorage.setItem("usr_email",data["email"])
 sessionStorage.setItem("like_s",data["liked_s"]);
});

    $(document).ready(function(){
       
        var x = window.matchMedia("(min-width: 992px)")
      
        if (x.matches){
            $(".sidebar-wrap").hover(function(){
                
                document.querySelector(".sidebar-wrap").style.width ="200px"; 
                document.querySelector("main").style.marginLeft ="200px"; 
                
            },function(){ 
                
                document.querySelector(".sidebar-wrap").style.width =""; 
                document.querySelector("main").style.marginLeft =""; });
        }
        
        else {
            console.log("small window");
        }
    });


  // Owlcarousel
$(document).ready(function(){
    $(".owl-carousels").owlCarousel({
        loop:true,
      margin:10,
      nav:true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      center: true,
      navText: [
          "<i class='fa fa-angle-left'></i>",
          "<i class='fa fa-angle-right'></i>"
      ],
      responsive:{
          0:{
              items:1
          },
          600:{
              items:2
          },
          1000:{
              items:3
          }
      }
    });
  });

//   music
$(document).ready(function(){
    const navbar=document.querySelector('.navbar')
    var b=$(".navbar-toggler")
    b.click(function(){
        var a=$(".navbar-toggler").hasClass("collapsed");
        
        if(a){
            navbar.classList.remove('navbar-scrolled');
        }
        else{
            navbar.classList.add('navbar-scrolled');
        }
    });
  });

var owl = $('.carousel_se_02_carousel');
owl.owlCarousel({
    items:5, 
    nav:true,
    loop:true,
    margin:10,
    responsiveClass: true,
    navText: ["<i class='icofont-bubble-left'></i>", "<i class='icofont-bubble-right'></i>"],
    responsive: {
        0: {
        items: 1,
        },
        480: {
        items: 2,
        },
        767: {
        items: 3,
        },
        992: {
        items: 3,
        },
        1200: {
        items: 5,
        },
    },
});

const navbar=document.querySelector('.navbar');
window.addEventListener('scroll',()=>{
    if(window.scrollY>=56){
        navbar.classList.add('navbar-scrolled')
    }
    else if(window.scrollY<56){
        navbar.classList.remove('navbar-scrolled')
    }
});

var group1=["liked","all","tamil","english","hindi","telugu","kannada"];
var group2=["anirudh","gvprakash","yuvan"];
var group3=["2020","2010","2000","1990","1980"];
function filters(a){
    localStorage.setItem('filter',group1[a]);
    window.location.href="music.html";
}

function artist(b){
    localStorage.setItem('filter',group2[b]);
    window.location.href="music.html"; 
}

function decades(c){
    localStorage.setItem('filter',group3[c]);
    window.location.href="music.html"; 
    // console.log(group3[c]);
}
