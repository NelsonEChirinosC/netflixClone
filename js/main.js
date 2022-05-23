////////////////////////////////////////////////////////////////////
///////////////// Mesuare speed scroll and stiky menu //////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

let principalHeader_toFixesNavs = document.querySelector(".toFixedNavs");


var checkScrollSpeed = (function(settings){
    settings = settings || {};

    var lastPos, newPos, timer, delta, 
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){ // && newPos < maxScroll 
        delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
})();

// listen to "scroll" event
window.onscroll = function(){
    // console.log( `${checkScrollSpeed()}`);

    let speedScroll = checkScrollSpeed();

    // console.log(speedScroll)

    if(!buttonSurpriseIsOpen){
        if(speedScroll < -10){
            // console.log("Hey ")
            openSurpriseButton();
            buttonSurpriseIsOpen = true
        }
    } else {
        
        if(speedScroll > 10){
            
            closeSurpriseButton();
            buttonSurpriseIsOpen = false
        }
    }
///////////////////////////////////////////////////////////////////
///////////////////// Styky menu ///////////////////////////////////
////////////////////////////////////////////////////////////////////
    // let scrollY = window.scrollY;

    console.log(scrollY)
    
    if(scrollY > 0){
        principalHeader_toFixesNavs.style.position = "fixed";
        principalHeader_toFixesNavs.style.top = "0px";
        principalHeader_toFixesNavs.style.width = "100%";
        principalHeader_toFixesNavs.style.backgroundColor = "rgba(0,0,0,0.8)"
        // principalHeader_toFixesNavs.style.transition = "none"
    } else {
        principalHeader_toFixesNavs.style.position = "relative"
        principalHeader_toFixesNavs.style.backgroundColor = "transparent";
        // principalHeader_toFixesNavs.style.transition = "0.5s all"
    }
};

///////////////// Button surprise ////////////////////////////
let buttonSurpriseIsOpen = false;
let surpriseButtonSpan = document.querySelector(".surpriseButton span");
let surpriseButtonDiv = document.querySelector(".surpriseButton");
let iconSurpriseButton = document.querySelector(".supriseButton i");

function openSurpriseButton(){
    surpriseButtonSpan.style.display ="inline-block"
    surpriseButtonDiv.style.width = "220px"
    surpriseButtonSpan.style.right = "0px";
    setTimeout(function(){
        surpriseButtonSpan.style.opacity = "1"
    },100)
}

function closeSurpriseButton(){
    surpriseButtonDiv.style.width = "50px"
    surpriseButtonSpan.style.right = "-1500px"
    surpriseButtonSpan.style.opacity = "0"
    setTimeout(function(){
        surpriseButtonSpan.style.display = "none"
    },100)
}

/// To uppercase the titles
let principalHeader_title = document.querySelector(".principalHeader_titleBg-h1");

principalHeader_title.innerHTML = principalHeader_title.innerHTML.toUpperCase();


///////////////// TO CHANGE COLOR ICON PRINCIPAL NAV && MODAL BUTTONS ////
////... Principal nav
let iconsNav = Array.from(document.querySelectorAll(".principal-nav ul li"));

iconsNav.forEach(icon => {
    icon.addEventListener("click", activeWhite)
});

function activeWhite(e){
    console.log(e.currentTarget)
    
    iconsNav.forEach(icon => {
        icon.classList.remove("activeIcon")
    })
    e.currentTarget.classList.add("activeIcon")
}


////...Modal movie
let iconsModalMovie = Array.from(document.querySelectorAll(".movieModal .playlist li"));
let iconsModalMovieDiv = Array.from(document.querySelectorAll(".movieModal .playlist li > div"));

iconsModalMovie.forEach(icon => {
    icon.addEventListener("click", activeIconsMovieModal)
});

function activeIconsMovieModal(e){
    iconsModalMovieDiv.forEach(icon => icon.classList.remove("active"));

    e.currentTarget.querySelector(".iconPlaylist").classList.add("active");
}


//////////////// TO CHANGE CHECK IN MI LISTA && SHOW MODAL /////
let addListLi = document.querySelectorAll(".addList");
let addAndRemoveDiv = document.querySelector(".addAndRemoveList");
let addAndRemoveDivP = document.querySelector(".addAndRemoveList p");
let isAdded = false;

addListLi.forEach(li => li.addEventListener("click", toAddList)); 

function toAddList(){
    let iconArray = Array.from(document.querySelectorAll(".addList i"));
    console.log(iconArray)

    if(!isAdded){
        iconArray[0].classList.remove("activeIcon");
        iconArray[1].classList.add("activeIcon");
        iconArray[2].classList.remove("activeIcon");
        iconArray[3].classList.add("activeIcon");
        

        showModalAddRemoveList(isAdded)

        isAdded = true;
    } else {
        iconArray[1].classList.remove("activeIcon");
        iconArray[0].classList.add("activeIcon");
        iconArray[3].classList.remove("activeIcon");
        iconArray[2].classList.add("activeIcon");

        showModalAddRemoveList(isAdded)

        isAdded = false;
    }

}

function showModalAddRemoveList(isAdded){
    addAndRemoveDiv.style.display = "flex";
    addAndRemoveDiv.style.position ="fixed"
    if(!isAdded){
        addAndRemoveDivP.innerHTML = "Se agrego a Mi Lista"
    } else {
        addAndRemoveDivP.innerHTML = "Se quito de Mi Lista"
    }

    setTimeout(function(){
        console.log("epa")
        addAndRemoveDiv.style.opacity = "1"
    },500);

    setTimeout(function(){
        addAndRemoveDiv.style.opacity = "0"
    },5000)

    setTimeout(function(){
        addAndRemoveDiv.style.display = "none"
    },6000)
}


///////////////// MODAL SHOW /////////////////////////

/////////// ((Modal that comes from below)) //////

let modalDown = document.querySelector(".modalDown");
let connectionDiv = document.querySelector(".connection");
let movieModal = document.querySelector('.movieModal');


function showModalTime(){
    modalDown.style.display = "block";
    modalDown.style.position = "fixed"
    modalDown.style.visibility = "visible"
    
    setTimeout(function(){
        modalDown.style.bottom = "0px";
    
    },100);
}


////.. Modal connect divice
let connectDevice = document.querySelector('.connectDevice');
let wrapperBlackModal = document.querySelector(".wrapperBlackModal");

connectDevice.addEventListener("click", showModalConnect);

function showModalConnect(){
    
    movieModal.style.display = "none";
    connectionDiv.style.display = "block";
    
    setTimeout(function(){
        wrapperBlackModal.style.display = "block";
        wrapperBlackModal.style.position = "fixed"
    },250)

    showModalTime();
}

////.. Modal movie details
let principalHeader = document.querySelector('.principalHeader');
let allModalMovie = Array.from(document.querySelectorAll(".modalMovieShow"));

allModalMovie.forEach(function(movie){
    movie.addEventListener("click", showMovieModal);
});

function showMovieModal(){

    connectionDiv.style.display = "none";
    movieModal.style.display = "block";

    showModalTime();

}

// console.log(allModalMovie)

// principalHeader.addEventListener("click", toKnow)

// function toKnow(e){
//     console.log(e.currentTarget)
// }


////.. Close Modal

let closeModalDiv = document.querySelector(".close");

closeModalDiv.addEventListener("click", closeModal);

function closeModal(){

    wrapperBlackModal.style.display = "none"

    modalDown.style.bottom = "-1000px";
    setTimeout(function(){
        modalDown.style.display ="none"
    },250)
}

/////////// ((Modal show without time)) //////

///.. Modal categories 

let categoriesModalLink = document.querySelector(".categoriesModal");
let categoriesModalBlock = document.querySelector(".modalCategories");
let closeCategories = document.querySelector(".closeCategories");

categoriesModalLink.addEventListener("click", showCategorieModal);

closeCategories.addEventListener("click", closeCategorieFunc)

function closeCategorieFunc(){
    categoriesModalBlock.style.display = "none"
}

function showCategorieModal(){
    categoriesModalBlock.style.display = "grid"
    categoriesModalBlock.style.position = "fixed"
    categoriesModalBlock.style.overflow = "auto"
    
}

////////////////////// SLIDERS /////////////////////////////////

////..mainSlider to put some movie in main sliders
let mainSliders = Array.from(document.querySelectorAll(".mainSlider_img"));
console.log(mainSliders);

mainSliders.forEach(function(slider){

    let src = "./images/abogadoLincolnmodal.jpg";

    for (let i = 0; i < 14; i++) {
        slider.innerHTML += `<img src="${src}" alt="Movie">`; 
    }

    console.log(slider)

});

////.. mainSlider to put some movie in the TOP /////////////////////////
let mainSliderTop = document.querySelector(".mainSlider_img-top");
console.log(mainSliderTop)

let srcImg = "./images/abogadoLincolnmodal.jpg";
let sliderWrapper = "";
let zIndex = 10;

for (let i = 1; i <= 10; i++) {

            sliderWrapper += `  <div class="slider" style="z-index:${zIndex}">
                                    <h1>${i}</h1>
                                    <img src="${srcImg}" alt="Movie">
                                </div>`;
    
            zIndex--;
}

console.log(sliderWrapper)
mainSliderTop.innerHTML += sliderWrapper;

////...gameSlider to put some game in the slider game ///////////////////////
let gameSlider = document.querySelector(".gameSlider .slider");

let srcImgGame = "./images/imageGame.jpg";
let sliderGameWrapper = "";

for(let i = 0; i < 8; i++){

    sliderGameWrapper += `
                        <figure>
                            <img src="${srcImgGame}" alt="game">
                            <figcaption>
                                <p>Stranger Things 3:el juego</p>
                                <span>Accion</span>
                            </figcaption>
                        </figure>
                         `;

}

gameSlider.innerHTML += sliderGameWrapper;

////...videoSlider to put some slider like video //////////////////
let videoSlider = document.querySelector(".mainSliderVideo .mainSliderVideo_img");
console.log(videoSlider)

let sliderVideoWrapper = "";

for(let i = 0; i <10; i++){
    sliderVideoWrapper += `
    <figure>
        <img src="./images/abogadoLincolnmodal.jpg" alt="">
        <div class="playVideo">
            <i class="fa-solid fa-play"></i>
        </div>
        <div class= "figcaption">
            <i class="fa-solid fa-circle-info"></i>
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
    </figure>
                         `;
}

console.log(sliderVideoWrapper)

videoSlider.innerHTML += sliderVideoWrapper;

let allMovieModalMain = Array.from(document.querySelectorAll(".mainSlider img, .mainSliderTop img, .mainSliderVideo figure .figcaption i.fa-circle-info"));

allMovieModalMain.forEach((movie) =>{
    movie.addEventListener('click',showMovieModal )
})


// mainSlidersTop.forEach(function(slider){

//     let src = "./images/abogadoLincolnmodal.jpg";
//     let zIndex = 10;

//     for (let i = 1; i <= 10; i++) {

//         slider.innerHTML += `<h1>${i}</h1><img src="${src}" alt="Movie">`;
//         slider.style.zIndex = zIndex;

//         zIndex--;
//     }


// })


