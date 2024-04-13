
const Name=document.getElementById("exampleInputEmail1");
const email=document.getElementById("exampleInputEmail2");
const pass1=document.getElementById("exampleInputPassword3");
const pass2=document.getElementById("exampleInputPassword4");
const mssg=document.getElementById("msg");
document.getElementById("submit").onclick = function() {
    let allAreFilled = true;
    let verify = true;
    document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
      if (!allAreFilled) return;

      if (!i.value) { allAreFilled = false;  return; }
    })
    if(pass1.value != pass2.value && allAreFilled){
        // console.log(pass1.value,pass2.value);
        alert('password mismatch');
        verify=false;
    }
    else if(String(pass1.value).length<8 && allAreFilled){
        alert('enter password in 8-digit ');
        verify=false;
    }
    if (!allAreFilled) {
      alert('Fill all the fields');
    }
    else if(allAreFilled && verify){
        // console.log("yes");
        fetch("https://spring-application.onrender.com/add_user",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({"name":Name.value,"email":email.value,"password":pass2.value})},mssg.innerHTML="Please wait a moment...").then(response => {
            if(response.status=="200"){
                // alert("User Created");
                mssg.innerHTML="User Created"
                location.reload();
                window.location.href = "extras/login.html";
            }
            else if(response.status=="400"){
                alert("Mail Already Exists !!!");
                location.reload();
            }
            else{
                alert("Something went wrong !!!");
            }}
        )
 
    }
  };

