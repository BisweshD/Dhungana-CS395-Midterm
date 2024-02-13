//===Lenis Init
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//===Progress Bars
//Get elements from the DOM
const progressBars = document.querySelectorAll(".progress");
//Loop through all progress bars
progressBars.forEach(progress => {
  //Set progress bar width to dataset value we set in the HTML
  progress.style.width = progress.dataset.level + "%";
});

//===GSAP Animations
window.addEventListener("load", () => {
  //Create gsap timeline
  const tl = gsap.timeline();

  //Preloader Animations
  tl.to(".preloader", {opacity: 0, delay: 0.5});
  tl.to(".loader", {animation: "none"});
  tl.to(".loader span", {animation: "none"});
  tl.to(".preloader", {display: "none"});

  //Hero Section Animations
  tl.from(".title1", {opacity: 0, x: 300});
  tl.from(".title2", {opacity: 0, x: -300});
  tl.from(".title3", {opacity: 0, x: 300});

  //Animate images in hero section if they exist
  tl.from(".img1", {scale: 0}, "<");
  tl.from(".img2", {scale: 0}, "<");
});

//On scroll GSAP animations
//Headings animation
const headings = gsap.utils.toArray('.heading h1');
headings.forEach(h => {
  gsap.from(h, { 
    opacity: 0,
    y: 200,
    ease: "power3.out",
    scrollTrigger: {
      start: "top 70%",
      trigger: h,
    }
  });
});

//Progress bars animation
const progress = gsap.utils.toArray('.progress');
progress.forEach(prog => {
  gsap.from(prog, { 
    width: 0,
    ease: "power3.out",
    scrollTrigger: {
      start: "top 70%",
      trigger: prog,
    }
  });
});

//===Filter Gallery
//Get Elements from the DOM
const btns = document.querySelectorAll('.gallery-controls button');
const imgs = document.querySelectorAll('.images img');

//Add a click event to all buttons
btns.forEach(btn => {btn.addEventListener('click', filterImg);});

//Set active button on click
function setActiveBtn(e) {
  //Remove active class from all buttons
  btns.forEach(btn => {btn.classList.remove('btn-active');});
  //Add active class to clicked button
  e.target.classList.add('btn-active');
}

//Filter Images
function filterImg(e) {
  //Run the active button function
  setActiveBtn(e);
  
  //Loop through all images
  imgs.forEach(img => {
    //Expand all images
    img.classList.remove('img-shrink');
    img.classList.add('img-expand');
    
    //Get data from data attributes
    const imgType = parseInt(img.dataset.img);
    const btnType = parseInt(e.target.dataset.btn);
    
    if(imgType !== btnType) {
      //Hide the image
      img.classList.remove('img-expand');
      img.classList.add('img-shrink');
    }
  });
}

//Set click event for the 'All' button
btns[0].addEventListener('click', (e) => {
  //Run the active button function
  setActiveBtn(e);
  //Loop through all images
  imgs.forEach(img => {
    //Expand all images
    img.classList.remove('img-shrink');
    img.classList.add('img-expand');
  });
});

//===Scroll Indicator and Navbar Active State
window.addEventListener("scroll", () => {
  let activeLink = null;
  checkpoints.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 50) {
      activeLink = navbarLinks[index];
    }
  });
  navbarLinks.forEach(link => {
    link.classList.remove("link-active");
  });
  if (activeLink) {
    activeLink.classList.add("link-active");
  }
});


// Optional: Add interactions for links and buttons
document.querySelectorAll("a, button").forEach(item => {
  item.addEventListener("mouseenter", () => tracker.classList.add("hidden"));
  item.addEventListener("mouseleave", () => tracker.classList.remove("hidden"));
});

//===Mouse Tracker
const tracker = document.querySelector(".tracker");

document.addEventListener("mousemove", (e) => {
  tracker.style.left = e.pageX + "px";
  tracker.style.top = e.pageY + "px";
});


