"use strict";

const cardsConteiner = document.getElementById("parent-div");
let displayCount = document.getElementById("step");
let displayTimer = document.getElementById("timer");
const startGame = document.getElementById("st-button");
const fullReset = document.getElementById("res-button");
const alertDisp = document.getElementById("alert-place");
const checkName = document.getElementById("fname");
let winnersList = document.getElementById("table")
let letters = /^[a-zA-Z]+$/;
let ddd;
const appMainObj = {
    cardsImages: [
        '<i data-id="1" class="fas fa-poo"></i>', 
        '<i data-id="1" class="fas fa-poo"></i>',
        '<i data-id="2" class="fas fa-hand-holding-usd"></i>',
        '<i data-id="2" class="fas fa-hand-holding-usd"></i>',
        '<i data-id="3" class="fas fa-dove"></i>',
        '<i data-id="3" class="fas fa-dove"></i>',
        '<i data-id="4" class="fas fa-baby-carriage"></i>',
        '<i data-id="4" class="fas fa-baby-carriage"></i>',
        '<i data-id="5" class="fas fa-grin-tongue"></i>',
        '<i data-id="5" class="fas fa-grin-tongue"></i>',
        '<i data-id="6" class="fas fa-hand-peace"></i>',
        '<i data-id="6" class="fas fa-hand-peace"></i>',
        '<i data-id="7" class="fas fa-anchor"></i>',
        '<i data-id="7" class="fas fa-anchor"></i>',
        '<i data-id="8" class="fas fa-dragon"></i>',
        '<i data-id="8" class="fas fa-dragon"></i>'
    ],
    frontImage : "<i class='fab fa-js-square'></i>",
    uIcardItems : [],
    firstCard : null,
    secondCard : null,
    clickCount : 0,
    winnerArr : [],
    CounterForScreen: 0,
    timerMinutes : 0,
    timerSeconds : 0,
    gamerName : "",
    checkClick : false,
}

    // game started
start()
function start(){
    shuffleandDrow();
    setuICardItems();
    listenOnClick();
}

    // cards shuffle and taking all card by className
function shuffleandDrow() {
    let allCards = ""; 
    const imgs = appMainObj.cardsImages;
    for(let j, hertakanItem, i = imgs.length-1; i > -1; --i){
        const numRndm = parseInt(Math.random() * i);
        hertakanItem = imgs[i];
        imgs[i] = imgs[numRndm];
        imgs[numRndm] = hertakanItem;
        allCards += `<div class='card-item'>
        <span class='front-side'>${appMainObj.frontImage}</span><span class='back-side'>${imgs[i]}</span></div>` ;
    };
    cardsConteiner.innerHTML = allCards;
};

function setuICardItems(){
    appMainObj.uIcardItems = document.getElementsByClassName("card-item")
};

    //adding click event to cards
function listenOnClick(){
    for (let i=0, length = appMainObj.uIcardItems.length; i<length; i++) {
    let everyItem = appMainObj.uIcardItems[i];
    everyItem.addEventListener("click", flipCard, false);
    
    }
}

    //flip card main function
function flipCard(event){
    if (appMainObj.firstCard === event.currentTarget) {
       return
    }

    if (appMainObj.clickCount === 0){
        if (!appMainObj.checkClick){
            alert("Please type your Name and press Start");
            return;
        } 
        addCountandFlip()
        startGame.removeEventListener("click", gameStarted, false);
        appMainObj.firstCard = event.currentTarget;
    }
    else if (appMainObj.clickCount === 1)  {
        addCountandFlip()
        appMainObj.secondCard = event.currentTarget;
        appMainObj.CounterForScreen++;
        displayCount.innerText = "Step: " + appMainObj.CounterForScreen;
        const fId = appMainObj.firstCard.querySelector('.back-side > i').getAttribute("data-id");
        const sId = appMainObj.secondCard.querySelector('.back-side > i').getAttribute("data-id");
        if (fId === sId){
            appMainObj.firstCard.removeEventListener("click", flipCard, false);
            appMainObj.secondCard.removeEventListener("click", flipCard, false);
            appMainObj.winnerArr.push(event.currentTarget);
            clear();
            if (appMainObj.winnerArr.length === 8){
                console.log(appMainObj.CounterForScreen);
                let winnersOutput = winnersList.innerHTML;
                winnersOutput +="<p class='table-name'>" + appMainObj.gamerName + "</p><p class='table-time'>"+ appMainObj.timerMinutes + ":"+ appMainObj.timerSeconds + "</p><p class='table-steps'>" + appMainObj.CounterForScreen + "</p>";
                winnersList.innerHTML = winnersOutput;
                startGame.addEventListener("click", gameStarted,false);
                StopTimer()
                alert("Wiiiiiiiiiiiiiner")
            }     
        }
        else{
            setTimeout(()=>{
            appMainObj.firstCard.classList.remove("flip");
            appMainObj.secondCard.classList.remove("flip");
            clear()},800);
            return
        }
    }
}

    //counting and give class flip
function addCountandFlip() {
    appMainObj.clickCount++;
    event.currentTarget.classList.add("flip");
}

    // clear card counter and cards
function clear(){
    appMainObj.clickCount = 0;
    appMainObj.firstCard = null;
    appMainObj.secondCard = null;
}
    //stop timer
function StopTimer() {
    clearInterval(ddd);
    appMainObj.timerMinutes = 0;
    appMainObj.timerSeconds = 0;
  }

    //listing cards for removing flips and givein click event
function listingCards(){
    for (let i=0, length = appMainObj.uIcardItems.length; i<length; i++) {
        let everyItem = appMainObj.uIcardItems[i];
        everyItem.classList.remove("flip");
        everyItem.addEventListener("click", flipCard, false);
    };
};

    //function for clear inpute div
function firstPosition(){
    alertDisp.innerText = "";
    checkName.style.borderColor = "initial";
    checkName.value = "";
}

    //reset button
fullReset.addEventListener("click", resetAll,false);
function resetAll(){
    StopTimer();
    displayTimer.innerHTML = "Timer: 00:00"
    shuffleandDrow();
    firstPosition();
    clear();
    listingCards();
    appMainObj.checkClick = false;
    startGame.addEventListener("click", gameStarted,false);
    appMainObj.gamerName = "";
    appMainObj.CounterForScreen = 0;
    displayCount.innerText = "Step: " + appMainObj.CounterForScreen;
    appMainObj.winnerArr = [];
}

    //start button with timer
startGame.addEventListener("click", gameStarted,false);
function gameStarted(){
    appMainObj.checkClick = true;
    shuffleandDrow();
    listingCards();
    appMainObj.CounterForScreen = 0;
    displayCount.innerText = "Step: " + appMainObj.CounterForScreen;
    appMainObj.winnerArr = [];
    if (!checkName.value.match(letters)){
        checkName.style.borderColor = "red";
        alertDisp.innerText = "Type only letters";
    } 
    else{
        appMainObj.gamerName = checkName.value;
        firstPosition();
        console.log(appMainObj.gamerName);
        displayTimer.innerHTML = "Timer: 00:00"
        ddd = setInterval(function (){
            appMainObj.timerSeconds ++;
            if (appMainObj.timerSeconds === 60){
                appMainObj.timerMinutes++;
                appMainObj.timerSeconds = 0;
                if (appMainObj.timerMinutes === 60){
                        alert("GAME OVER")
                        resetAll();
                }
            }
        displayTimer.innerHTML = "Timer: " + appMainObj.timerMinutes+" : "+appMainObj.timerSeconds;
        },1000);
    }
}

