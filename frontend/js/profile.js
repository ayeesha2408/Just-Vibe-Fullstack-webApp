var usr_name=sessionStorage.getItem("usr_name");
var usr_email=sessionStorage.getItem("usr_email");

document.getElementById("Name").innerHTML=usr_name;
document.getElementById("Email").innerHTML=usr_email;

document.getElementById("home").addEventListener("click",function(){
    window.location.href="homepage.html"; 
})

document.getElementById("logout").addEventListener("click",function(){
    sessionStorage.removeItem("usr_name");
    sessionStorage.removeItem("usr_email");
    sessionStorage.removeItem("usr_id");
    window.location.href="login.html";});
window.history.forward();
  