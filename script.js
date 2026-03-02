window.onload=function(){
let bg=localStorage.getItem("heroBg");
if(bg){
document.querySelector(".hero").style.background=`url('${bg}') center/cover`;
}

loadReviews();
};
// Popup
function openPopup(text){
document.getElementById("popupText").innerText=text;
document.getElementById("popup").style.display="flex";
}
function closePopup(){
document.getElementById("popup").style.display="none";
}

// Star rating
let rating=0;
document.querySelectorAll(".star").forEach(star=>{
star.addEventListener("click",function(){
rating=this.dataset.value;
document.querySelectorAll(".star").forEach(s=>s.classList.remove("active"));
for(let i=0;i<rating;i++){
document.querySelectorAll(".star")[i].classList.add("active");
}
});
});

// Review System
const reviewForm=document.getElementById("reviewForm");
const reviewList=document.getElementById("reviewList");

window.onload=function(){
let reviews=JSON.parse(localStorage.getItem("reviews"))||[];
reviews.forEach(addReviewToPage);
};

reviewForm.addEventListener("submit",function(e){
e.preventDefault();
let name=document.getElementById("reviewName").value;
let text=document.getElementById("reviewText").value;

let reviews=JSON.parse(localStorage.getItem("reviews"))||[];
if(reviews.find(r=>r.name===name)){
alert("You already submitted a review!");
return;
}

let review={name,text,rating};
reviews.push(review);
localStorage.setItem("reviews",JSON.stringify(reviews));
addReviewToPage(review);
reviewForm.reset();
});

function addReviewToPage(review){
let div=document.createElement("div");
div.className="review";
div.innerHTML=`<strong>${review.name}</strong>
<p>${"★".repeat(review.rating)}</p>
<p>${review.text}</p>`;
reviewList.appendChild(div);
}
// 3D Tilt Effect
document.querySelectorAll(".card").forEach(card=>{
card.addEventListener("mousemove",(e)=>{
let x = e.offsetX;
let y = e.offsetY;
let centerX = card.offsetWidth/2;
let centerY = card.offsetHeight/2;
let rotateX = -(y-centerY)/15;
let rotateY = (x-centerX)/15;
card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave",()=>{
card.style.transform="rotateX(0) rotateY(0)";
});
});
ScrollReveal().reveal('.section', {
distance: '80px',
duration: 1500,
easing: 'ease-in-out',
origin: 'bottom',
interval: 200
});

const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();

const hoverElements = document.querySelectorAll("a, button, .card");

hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.width = "60px";
        cursor.style.height = "60px";
    });

    el.addEventListener("mouseleave", () => {
        cursor.style.width = "30px";
        cursor.style.height = "30px";
    });
});
// Old localStorage code
// localStorage.setItem("booking", JSON.stringify(bookingData));

// NEW: send to backend
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bookingData = {
    name: bookingForm.name.value,
    phone: bookingForm.phone.value,
    service: bookingForm.service.value,
    date: bookingForm.date.value,
  };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    alert(data.msg || "Booking submitted!");
    bookingForm.reset();
  } catch (err) {
    console.error(err);
    alert("Error submitting booking.");
  }
});

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const reviewData = {
    name: reviewForm.name.value,
    rating: parseInt(reviewForm.rating.value),
    message: reviewForm.message.value,
  };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    const data = await res.json();
    alert(data.msg || "Review submitted!");
    reviewForm.reset();
    loadReviews(); // reload review section
  } catch (err) {
    console.error(err);
    alert("Error submitting review.");
  }
});
async function loadReviews() {
  const reviewContainer = document.getElementById("reviewContainer");
  reviewContainer.innerHTML = "Loading reviews...";

  try {
    const res = await fetch("http://127.0.0.1:5000/api/reviews");
    const reviews = await res.json();

    reviewContainer.innerHTML = reviews
      .map(
        (r) => `
      <div class="review-card">
        <h4>${r.name}</h4>
        <p>⭐ ${r.rating}</p>
        <p>${r.message}</p>
      </div>
    `
      )
      .join("");
  } catch (err) {
    reviewContainer.innerHTML = "Failed to load reviews.";
    console.error(err);
  }
}

// Load reviews on page load
loadReviews();