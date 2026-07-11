const token=localStorage.getItem("token");
console.log(token);
async function loadProfile(){
const response=await fetch("http://localhost:3000/profile",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
const user=await response.json();
const body=document.querySelector("#body");
const userName=document.querySelector("#name");
const age=document.querySelector("#age");
const college=document.querySelector("#college");
const course=document.querySelector("#course");
const list=document.querySelector("#skillsList");
userName.innerText=user.name;
age.innerText=user.age;
college.innerText=user.collegeName;
course.innerText=user.course;
user.skills.forEach(element => {
    const li=document.createElement("li");
    li.innerText=element;
    list.appendChild(li);
});
console.log(user);

} 
const deleteButton=document.querySelector("#delete");
deleteButton.addEventListener("click",async()=>{
    const response=await fetch("http://localhost:3000/profile",{
        method:"DELETE",
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    });
    alert("Account Deleted successfully !");
    window.location.href="login.html";
    
})
const logout=document.querySelector("#logout")
logout.addEventListener("click",async()=>{
    localStorage.removeItem("token");
    window.location.href="login.html";
})
loadProfile();
