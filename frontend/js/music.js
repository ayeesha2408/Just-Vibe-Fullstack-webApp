
const usr_id = sessionStorage.getItem("usr_id");
var like_s = sessionStorage.getItem("like_s");
var array = JSON.parse("[" + like_s + "]");
// console.log(array.length);
let now_playing = document.querySelector('.now-playing');
  // let track_art = document.querySelector('.track-art');
  // let track_name = document.querySelector('.track-name');
  // let track_artist = document.querySelector('.track-artist');
  
  let playpause_btn = document.querySelector('.playpause-track');
  let next_btn = document.querySelector('.next-track');
  let prev_btn = document.querySelector('.prev-track');
  
  let seek_slider = document.querySelector('.seek_slider');
  let volume_slider = document.querySelector('.volume_slider');
  let curr_time = document.querySelector('.current-time');
  let total_duration = document.querySelector('.total-duration');
  let wave = document.getElementById('wave');
  // let randomIcon = document.querySelector('.fa-random');
  let curr_track = document.createElement('audio');
  
  let track_index = 0;
  let isPlaying = false;
  let isRandom = false;
  let updateTimer;

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
  else{
      console.log("");
  }
});

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

const navbar=document.querySelector('.navbar');
window.addEventListener('scroll',()=>{
    if(window.scrollY>=56){
        navbar.classList.add('navbar-scrolled')
    }
    else if(window.scrollY<56){
        navbar.classList.remove('navbar-scrolled')
    }
});


const products=document.querySelector(".rows");
function cards(name="",url="",Id="",num=""){
  if(name=="none"){
    products.innerHTML="";
  }
  else{
    let code=`
  <div class="col" data-category="websites">
    <div class="background">
      <div class="card cards" style="width: 18rem;">
      <img src="../images/music.jpg" alt="" style="width: 100%;" onclick="c(${Id},${num})">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <div class="container-fluid">
            <div class="row ">
              <div class="col-2 align-self-center"></div>
              <div class="col-8 align-self-center">
                <div onclick="c(${Id},${num})" id="play${Id}" class="play pla${num}"><i class="fa fa-play-circle fa-2x "></i></div>
              </div>
              <div class="col-2 align-self-center">
                <div onclick="Like(${Id})"><i class="fa-heart" id="like${Id}"></i></div>
              </div>
            </div>
            <source src="${url}" type="audio/mpeg">
          </audio>
        </div>
      </div>
    </div>
  </div>
  `;
  products.innerHTML+=code;
  }
  
};


  var li=0;
  var number=-1;
  var aa=0;
  var path="";
  var active="";
  var id_a=0;
  var music_list = [];
  var filterValue=localStorage.getItem('filter');
  var title=document.getElementById("head");
  const fil = ["tamil","english","hindi","telugu","kannada",
              "anirudh","gvprakash","yuvan",
              "2020","2010","2000","1990","1980",
              "liked", "all"];
  // console.log(filterValue);
  for (let i = 0; i < fil.length; i++){
    if(fil[i]==filterValue.toLowerCase()){
      // console.log(i);
      if($("#"+fil[i]).hasClass("active")){
        continue
      }
      else{
        if(i<5){
          document.getElementById("lang").classList.add('active');
          
        }
        else if(i>4&&i<8){
          document.getElementById("artist").classList.add('active');
        }
        else if(i>7&&i<13){
          document.getElementById("year").classList.add('active');
        }
        document.getElementById(fil[i]).classList.add('active');
      }
      
      cards("none");
      pauseTrack();
      title.innerHTML=fil[i].toUpperCase()+" "+"SONGS";
      if(filterValue.toLowerCase()==fil[i]&&i<5){
        path="lang/"+filterValue.toLowerCase();
        music_list=[];
        track_index=0;
      }
      else if(filterValue.toLowerCase()==fil[i]&&i>4&&i<8){
        path="artist/"+filterValue.toLowerCase();
        music_list=[];
        track_index=0;
      }
      else if(filterValue.toLowerCase()==fil[i]&&i>7&&i<13){
        path="year/"+filterValue.toLowerCase();
        music_list=[];
        track_index=0;
      }
      else if(filterValue.toLowerCase()=="all"){
        path=filterValue.toLowerCase();
        music_list=[];
        track_index=0;
      }
      else{
        
        if(array.length!=0){
          path="liked/"+array;
          music_list=[];
          track_index=0;
        
        }
        else{
          alert("No Songs Available :(");
          continue;
        }
      }
        li=0;
        let response=(fetch("https://spring-application.onrender.com/song/"+path).then(res => res.json()));
        response.then(data=>{
          // console.log(filterValues);
          for(let l=0;l<data.length;l++){
            // console.log(music_list);
            music_list.push(data[l][1]);
            // console.log(data[l][0],li);
            cards(data[l][2].toUpperCase(),data[l][1],String(data[l][0]),li);
            if(array.length!=0){
              for(let s=0;s<array.length;s++){
                if(array[s]==String(data[l][0])){
                  document.getElementById("like"+array[s]).classList.add("fa-solid");

                }
                else{
                  document.getElementById("like"+String(data[l][0])).classList.add("fa-regular");
                }
              }
            }
            else{
              document.getElementById("like"+String(data[l][0])).classList.add("fa-regular");
            }
            li+=1;
          }
          setTimeout(myFunction, 1000);
        });
        
      }
    }
  
  
  $('.filter-button-group').on( 'click', 'a', function() {
    
    var filterValues = $(this).attr('data-filter');
    localStorage.setItem('filter',filterValues.toLowerCase());
    // console.log(filterValues.toLowerCase());
    pauseTrack();
    for(let j=0;j<fil.length;j++){
      if($("#"+fil[j]).hasClass("active")){
        if(j<5){
          document.getElementById("lang").classList.remove('active');
        }
        else if(j>4&&j<8){
          document.getElementById("artist").classList.remove('active');
        }
        else if(j>7&&j<13){
          document.getElementById("year").classList.remove('active');
        }
        
        document.getElementById(fil[j]).classList.remove('active');
        // console.log("removed");
      }
    }
    for (let i = 0; i < fil.length; i++){
      if(fil[i]==filterValues.toLowerCase()){
        // console.log(i);
        if($("#"+fil[i]).hasClass("active")){
          continue;
        }
        else{
          if(i<5){
            document.getElementById("lang").classList.add('active');
          }
          else if(i>4&&i<8){
            document.getElementById("artist").classList.add('active');
          }
          else if(i>7&&i<13){
            document.getElementById("year").classList.add('active');
          }
          document.getElementById(fil[i]).classList.add('active');
          // console.log("added");
        }
        
        cards("none");
        pauseTrack();
        title.innerHTML=fil[i].toUpperCase()+" "+"SONGS";
        // console.log(array,like_s);
        
        if(filterValues.toLowerCase()==fil[i]&&i<5){
          path="lang/"+filterValues.toLowerCase();
          music_list=[];
          track_index=0;
        }
        else if(filterValues.toLowerCase()==fil[i]&&i>4&&i<8){
          path="artist/"+filterValues.toLowerCase();
          music_list=[];
          track_index=0;
        }
        else if(filterValues.toLowerCase()==fil[i]&&i>7&&i<13){
          path="year/"+filterValues.toLowerCase();
          music_list=[];
          track_index=0;
        }
        else if(filterValues.toLowerCase()=="all"){
          path=filterValues.toLowerCase();
          music_list=[];
          track_index=0;
        }
        else{
          
          if(array.length!=0){
            path="liked/"+array;
            music_list=[];
            track_index=0;
          
          }
          else{
            // alert("No Songs Available :(");
            continue;
          }
        }
          li=0;
          let response=(fetch("https://spring-application.onrender.com/song/"+path).then(res => res.json()));
          response.then(data=>{
            // console.log(filterValues);
            for(let l=0;l<data.length;l++){
              // console.log(music_list);
              music_list.push(data[l][1]);
              // console.log(data[l][0],li);
              cards(data[l][2].toUpperCase(),data[l][1],String(data[l][0]),li);
              if(array.length!=0){
                for(let s=0;s<array.length;s++){
                  if(array[s]==String(data[l][0])){
                    document.getElementById("like"+array[s]).classList.add("fa-solid");
  
                  }
                  else{
                    document.getElementById("like"+String(data[l][0])).classList.add("fa-regular");
                  }
                }
              }
              else{
                document.getElementById("like"+String(data[l][0])).classList.add("fa-regular");
              }
              
              li+=1;
            }
            setTimeout(myFunction, 1000);
            // console.log(music_list);
          });
          
        }
      }
    }
  );

  function myFunction() {
    loadTrack(track_index);
  }
  
   function loadTrack(track_index){
    number=track_index;
    aa=id_a;
    // console.log(number,aa);
  
      clearInterval(updateTimer);
      reset();
      curr_track.src = music_list[track_index];
      curr_track.load();
      // now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
  
      updateTimer = setInterval(setUpdate, 100);
  
      curr_track.addEventListener('ended', nextTrack);
      
  }
  function c(a,b=""){
    
    
    if($("#play"+a).hasClass("active")){
      
      document.getElementById("play"+a).classList.remove('active');
      document.querySelector(".pla"+b).innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
      pauseTrack();
    }
    else{
      
      document.getElementById("play"+a).classList.add('active');
      document.querySelector(".pla"+b).innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
      track_index=b;
     
      if(isPlaying==false && number==track_index){
        
        playTrack();
      } 
      else{
        // console.log(number);
        document.querySelector(".pla"+number).classList.remove('active');
        
        document.querySelector(".pla"+number).innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
        
        loadTrack(track_index);
        id_a=a;
        playTrack();
        
      }
    }
    
  }
  window.c=c;
  
  function Like(id){ 
    const index = array.indexOf(id);
    if(array[index]==id){
      // console.log(id);
      array.splice(index, 1);
      document.getElementById("like"+String(id)).classList.remove("fa-solid");
      document.getElementById("like"+String(id)).classList.add("fa-regular");
    }
    else{
      array.push(id);
      document.getElementById("like"+String(id)).classList.remove("fa-regular");
      document.getElementById("like"+String(id)).classList.add("fa-solid");
    }
    // console.log(array);
  }
  window.Like=Like;

  function reset(){
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
  }
  
  function repeatTrack(){
      let current_index = track_index;
      loadTrack(current_index);
      playTrack();
  }
  function playpauseTrack(){
      
      isPlaying ? pauseTrack() : playTrack();
  }
  
  function playTrack(){
      
      curr_track.play();
      isPlaying = true;
      playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
      document.querySelector(".pla"+track_index).innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
      
      document.querySelector(".pla"+track_index).classList.add('active');
  }
  function pauseTrack(){
      curr_track.pause();
      
      if(isPlaying==true){
        
        document.querySelector(".pla"+track_index).classList.remove('active');
        document.querySelector(".pla"+track_index).innerHTML='<i class="fa fa-play-circle fa-2x"></i>';
        
      }
      isPlaying = false;
      playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
      
  }
  function nextTrack(){
      
      if(track_index < music_list.length - 1 && isRandom === false){
        document.querySelector(".pla"+track_index).innerHTML='<i class="fa fa-play-circle fa-2x"></i>';
        document.querySelector(".pla"+number).classList.remove('active');
        
          track_index += 1;
      }
       ///////////////
      loadTrack(track_index);
      // console.log(aa,track_index,number,"buygug");
      
      playTrack();
  }
  function randomTrack(){
    document.querySelector(".pla"+track_index).innerHTML='<i class="fa fa-play-circle fa-2x"></i>';
    document.querySelector(".pla"+number).classList.remove('active');
    // console.log(music_list.length);
    var rand=Math.floor(Math.random() * (music_list.length));
    track_index=rand;
    loadTrack(track_index);
    playTrack();
    // isRandom ? pauseRandom() : playRandom();
}


  function prevTrack(){
    document.querySelector(".pla"+track_index).innerHTML='<i class="fa fa-play-circle fa-2x"></i>';
    document.querySelector(".pla"+number).classList.remove('active');
      if(track_index > 0){
          track_index -= 1;
      }else{
          track_index = music_list.length -1;
      }
      loadTrack(track_index);
      
      playTrack();
  }
  function seekTo(){
      let seekto = curr_track.duration * (seek_slider.value / 100);
      curr_track.currentTime = seekto;
  }
  function setVolume(){
      curr_track.volume = volume_slider.value / 100;
  }
  function setUpdate(){
      let seekPosition = 0;
      if(!isNaN(curr_track.duration)){
          seekPosition = curr_track.currentTime * (100 / curr_track.duration);
          seek_slider.value = seekPosition;
  
          let currentMinutes = Math.floor(curr_track.currentTime / 60);
          let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
          let durationMinutes = Math.floor(curr_track.duration / 60);
          let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
          if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
          if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
          if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
          if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
          curr_time.textContent = currentMinutes + ":" + currentSeconds;
          total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
  }
  window.addEventListener("beforeunload", function() {
    console.log("");
    fetch("https://spring-application.onrender.com/song/U_SongList",{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({"liked":String(array),"id":usr_id})});
      sessionStorage.setItem("like_s",array);
  });
  window.playpauseTrack=playpauseTrack;
  window.prevTrack=prevTrack;
  window.nextTrack=nextTrack;
  window.seekTo=seekTo;
  window.repeatTrack=repeatTrack;
  window.randomTrack=randomTrack;
  window.setVolume=setVolume;
  
  
 


