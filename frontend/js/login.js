
const email=document.getElementById("exampleInputEmail1");
const pass1=document.getElementById("exampleInputPassword1");
const mssg=document.getElementById("msg");

document.getElementById("submit").onclick = function() {
    let allAreFilled = true;
    document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
      if (!allAreFilled) return;

      if (!i.value) { allAreFilled = false;  return; }
    })
   
    if (!allAreFilled) {
      alert('Fill all the fields');
    }
    else{
        // console.log("yes");
        fetch("https://spring-application.onrender.com/Authenticate",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({"email":email.value,"password":pass1.value})},mssg.innerHTML="Please wait a moment...").then(response => 
          {console.log(response.status)
            if (response.status==401){
              return "";
            }
            else{
              return response.json();
        }}).then(data=>
          {
            // console.log(data);
            if(data!=""){
                // console.log(data)
                // alert("successfully logged-in");
                mssg.innerHTML="successfully logged-in";
                sessionStorage.setItem("usr_id", data);
               
                location.reload();
                window.location.href = "homepage.html";
            }
            else{
                alert("Please Check Your Credentials");
            }}
          
        )
 
    }
  };

  // function myFunction() {
    
  //   if (pass1.type == "password") {
  //     pass1.type = "text";
  //     document.getElementById("eye").classList.remove('fa-eye-slash');
  //     document.getElementById("eye").classList.add('fa-eye');
  //   } else {
  //     pass1.type = "password";
  //     document.getElementById("eye").classList.remove('fa-eye');
  //     document.getElementById("eye").classList.add('fa-eye-slash');
  //   }
  // }