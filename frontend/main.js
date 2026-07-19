const username=document.querySelector("#username");
const password=document.querySelector("#password");
const userName=document.querySelector("#Name");
const age=document.querySelector("#age");
const college=document.querySelector("#college");
const course=document.querySelector("#course");
const skills=document.querySelector("#skills");
const registerButton=document.querySelector("#registerButton");
const loginButton=document.querySelector("#loginButton");
const usernames=document.querySelector("#Username");
if(registerButton){// same reason why we are using if condition check at line 36 soln is to create seperate js files for registartion and login page
registerButton.addEventListener("click",async(e)=>{
     e.preventDefault();
    const user={
    username:username.value,
    password:password.value,
    name:userName.value,
    age:age.value,
    course:course.value,
    collegeName:college.value,
    skills:skills.value.split(",")
}
const response=await fetch("http://localhost:3000/register",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user) 
})
const data=await response.json();
console.log(data);
alert("registration successfull !");// message appears in a box
window.location.href="login.html";// user is automatically redirected to the login page after registeration completed
})
}
if(loginButton){// this if condition is used bcz in login page there is only login button no register button so when register.eventListner runs it throws error saying that cannot read null bcz register button becomes null
loginButton.addEventListener("click",async(e)=>{
     e.preventDefault();
    const response=await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
            
        },
        body:JSON.stringify({
            username:usernames.value,
            password:password.value
        })
    })
    const user=await response.json();
    localStorage.setItem("token", user.token);
    window.location.href="profile.html";
})
}