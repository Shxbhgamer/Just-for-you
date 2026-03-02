function login(){
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

if(email==="shubhkeshri789@gmail.com" && password==="rishubh@10"){
document.getElementById("dashboard").style.display="block";
loadReviews();
}else{
alert("Wrong Credentials");
}
}

function logout(){
location.reload();
}

function changeBg(){
let url=document.getElementById("bgUrl").value;
localStorage.setItem("heroBg",url);
alert("Background Updated! Go back to homepage.");
}

function loadReviews(){
let reviews=JSON.parse(localStorage.getItem("reviews"))||[];
let container=document.getElementById("adminReviews");
container.innerHTML="";

reviews.forEach((r,index)=>{
container.innerHTML+=`
<div class="review">
<strong>${r.name}</strong>
<p>${"★".repeat(r.rating)}</p>
<p>${r.text}</p>
<button onclick="deleteReview(${index})">Delete</button>
</div>`;
});
}

function deleteReview(index){
let reviews=JSON.parse(localStorage.getItem("reviews"))||[];
reviews.splice(index,1);
localStorage.setItem("reviews",JSON.stringify(reviews));
loadReviews();
}