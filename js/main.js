let colorLi = document.querySelectorAll(".color-list li");
// check if the local storage have data before this time
if (localStorage.getItem("colorOption")) {
  //if the local storage have data before then edit for the main-color in the css file
  //for the previous color
  document.documentElement.style.setProperty("--main-color",`${localStorage.getItem("colorOption")}`);
  //remove the active class from all li color
  colorLi.forEach((li)=> {
    li.classList.remove("active");

    //add the active class for the color who its dataset equal to
    //data in the local storage
    if (li.dataset.color === localStorage.getItem('colorOption')) {
      li.classList.add("active");
    }
  })
}
let settingsBtn = document.querySelector(".settings-box .icon");
let settingsBox = document.querySelector(".settings-box");
let settingsIcon = document.querySelector(".settings-box .icon i");
//add to the settings button event when you click to it.
//and then add opened class this class will moved to the user.
settingsBtn.addEventListener("click", ()=>{
    settingsBox.classList.toggle("opened");
    settingsIcon.classList.toggle("rotate");
})


// make a loop for all color list if you click one of them
// make event that will add active class to it
colorLi.forEach((li) => {
  li.addEventListener("click", ()=> {

    colorLi.forEach((li)=> {
      li.classList.remove("active");
    })
    li.classList.add("active");
    document.documentElement.style.setProperty("--main-color",`${li.dataset.color}`);
    localStorage.setItem("colorOption", li.dataset.color);
  })
})

// for bullets 
let bulletsAll = document.querySelectorAll(".bullets .bullet");
let sections = document.querySelectorAll("body > div[id]");


let arraySection = Array.from(sections);

window.addEventListener("scroll", ()=>{
  let current = "";
  sections.forEach((section)=>{
    let windowScroll = window.scrollY;
    let sectionTop = section.offsetTop;
    if (windowScroll + 400 >= sectionTop) {
      current = section.getAttribute("id");
    }
  })
  bulletsAll.forEach((bullet)=>{
    bullet.classList.remove("active");
    if (current === bullet.dataset.section) {
      bullet.classList.add("active");
    }
  })
})



let imagesFile = document.querySelector('.landing-page .images');
let imgs = document.querySelectorAll(".images img");
imagesFile.style.transform = `translate(-100vw)`;
let counter = 1;
let multiBackgrounds = document.querySelectorAll(".settings-box .multi-backgrounds span");
let multiBackgroundsOption = true;
let intervalCleaner = "";
let localStorageItem = localStorage.getItem("backgroundOption");
//check if in the local storage have the option of multiBackgroundOption
//if not then play the function backgroundChanger
if(localStorageItem !== null) {
  multiBackgrounds.forEach((span)=>{
    span.classList.remove("active");
  })
  if (localStorageItem === 'yes'){
    multiBackgroundsOption = true;
    backgroundChanger();
    document.querySelector(".settings-box .multi-backgrounds .yes").classList.add("active");
  }
  else {
    clearInterval(intervalCleaner);
    multiBackgroundsOption = false;
    document.querySelector(".settings-box .multi-backgrounds .no").classList.add("active");
  }
}
else {
  backgroundChanger()
}

let showBulletsSpans = document.querySelectorAll(".settings-box .show-bullets span");
let bullets = document.querySelector("body > div.bullets");

if (localStorage.getItem("bulletsOption")) {
  if (localStorage.getItem("bulletsOption") === "yes") {
    console.log("yea")
    showBulletsSpans.forEach((span)=>{
      span.classList.remove("active");
    })
    document.querySelector(".settings-box .show-bullets .yes").classList.add("active");
    bullets.classList.remove("cancel");
  }
  else {
    showBulletsSpans.forEach((span)=>{
      span.classList.remove("active");
    })
    document.querySelector(".settings-box .show-bullets .no").classList.add("active");
    bullets.classList.add("cancel");
  }
}

console.log(bullets)
showBulletsSpans.forEach((span)=>{
  span.addEventListener("click", ()=>{
    showBulletsSpans.forEach((span)=>{
      span.classList.remove("active");
    })
    span.classList.add("active");
    if (span.dataset.bullets === "yes"){
      bullets.classList.remove("cancel");
      localStorage.setItem("bulletsOption", "yes");
    }
    else {
      bullets.classList.add("cancel");
      localStorage.setItem("bulletsOption", "no");
    }
  });
})



let resetSettings = document.querySelector(".settings-box .reset");
resetSettings.addEventListener("click", ()=>{
  localStorage.clear();
  window.location.reload();
})

let headerLinks = document.querySelector("header .links-container .links");
let toggleMenu = document.querySelector("header .links-container div.toggle-menu")
console.log(toggleMenu)

toggleMenu.addEventListener("click", (e)=>{
  e.stopPropagation();
  headerLinks.classList.toggle("opened");
  toggleMenu.classList.toggle("opened");
})
document.addEventListener("click", (e)=>{
  console.log(e.target);
  if (headerLinks.classList.contains("opened"))
    if(!(e.target === toggleMenu) && !(e.target === headerLinks)) {
      headerLinks.classList.remove("opened");
      toggleMenu.classList.remove("opened");
    }
  
  
})

//the imagesFile this the element who has all the images ordered horizontally
//and every 10 seconds move this element to next image 
//(every image's width 100vw)
function backgroundChanger(){
  if (multiBackgroundsOption){
    intervalCleaner = setInterval(()=> {
      imagesFile.style.transition = "0.5s"
      imagesFile.style.transform = `translate(${-100 * counter}vw)`;
      counter++;
      //every transitionend check if the imagesFile reach to the end
      //if it reaches return to the beginning
      imagesFile.addEventListener("transitionend", ()=>{
        if(counter >= 6){
          imagesFile.style.transition = "none"
          imagesFile.style.transform = `translate(0)`;
          counter = 1;
        }
      }) 
    }, 10000);
  }
}


//make a loop for all color list if you click one of them
//make event that will add active class to it
multiBackgrounds.forEach((span) => {
  span.addEventListener("click", ()=> {

    multiBackgrounds.forEach((span)=> {
      span.classList.remove("active");
    })
    span.classList.add("active");
    if (span.dataset.background === "yes") {
      multiBackgroundsOption = true;
      backgroundChanger();
    }
    else {
      multiBackgroundsOption = false;
      clearInterval(intervalCleaner);
    }
    localStorage.setItem("backgroundOption", span.dataset.background);
  })
})


let progressOfSpan = document.querySelectorAll(".skills .skill-progress span");
let skill = document.querySelector(".skills");
let gallery = document.querySelector(".gallery");
let images = document.querySelectorAll(".gallery .images-box img");

//when you scroll the window make sure to check 
//if the window reach to the our-skills section
//if reaches so write the with of the progress from
//it's data custom

window.onscroll = ()=> {
  if (window.scrollY >= (skill.offsetTop - 500)){
    progressOfSpan.forEach((span)=>{
      span.style.width = span.dataset.width;
    })
  }
  if (window.scrollY >= (gallery.offsetTop - 500)) {
    images.forEach((img)=>{
      img.style.transform = "scale(1)";
    })
  }
}

images.forEach((img)=>{
  img.addEventListener("click", (e)=>{

    //create element for overlay
    let overlay = document.createElement("div");

    //create class Name to customize it in css
    overlay.className = "popup-overlay";

    //append to the body
    document.body.appendChild(overlay);

    //create the popupBox
    let popupBox = document.createElement("div");

    //create class name to customize it in css
    popupBox.className = 'popup-box';

    if (img.alt !== null) {
      let header = document.createElement("h3");
      let text = document.createTextNode(img.alt);
      header.appendChild(text);
      popupBox.appendChild(header);
    }
    //create the close toggle
    let closeToggle = document.createElement("i");

    closeToggle.className = "fa-thin fa-circle-xmark";

    //append to the popup-box
    popupBox.appendChild(closeToggle);

    //create the img
    let popupImg = document.createElement("img");

    closeToggle.addEventListener("click", ()=> {
      popupBox.remove();
      overlay.remove();
    })
    //assign this img with the source of the img
    //that added click event
    popupImg.src = img.src;
    popupImg.style.borderRadius =  "5px";
    //append img to the popup-box
    popupBox.appendChild(popupImg);

    //append the popupBox to the body
    document.body.appendChild(popupBox);
  })
})


