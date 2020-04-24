"use strict";

const cardsConteiner = document.getElementById("parent-div");
const displayCount = document.getElementById("step");
const displayTimer = document.getElementById("timer");
const startGame = document.getElementById("st-button");
const fullReset = document.getElementById("res-button");
const alertDisp = document.getElementById("alert-place");
const userName = document.getElementById("fname");
const winnersList = document.getElementById("table");
const letters = /^[a-zA-Z]+$/;
let players = [];
let timerInterval;
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
    openedCouple : 0,
    counterForScreen: 0,
    timerMinutes : 0,
    timerSeconds : 0,
    gamerName : "",
    allowPlay : false,
    newPlayer: {}
}

start()
    // game started
function start(){
    shuffleandDrow();
    setuICardItems();
    listenOnClick();
    getPlayersScores();
    fullReset.addEventListener("click", resetAll,false);
    startGame.addEventListener("click", gameStarted,false);
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
    appMainObj.uIcardItems = document.getElementsByClassName("card-item");
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
       return;
    }
    if (appMainObj.clickCount === 0){
        if (!appMainObj.allowPlay){
            alert("Please type your Name and press Start");
            return;
        } 
        addCountAndFlip()
        startGame.removeEventListener("click", gameStarted, false);
        appMainObj.firstCard = event.currentTarget;
    }
    else if (appMainObj.clickCount === 1)  {
        addCountAndFlip()
        appMainObj.secondCard = event.currentTarget;
        appMainObj.counterForScreen++;
        displayCount.innerText = "Step: " + appMainObj.counterForScreen;
        checkWin()
    }
}

function checkWin(){
    const fId = appMainObj.firstCard.querySelector('.back-side > i').getAttribute("data-id");
    const sId = appMainObj.secondCard.querySelector('.back-side > i').getAttribute("data-id");
    if (fId === sId){
        appMainObj.firstCard.removeEventListener("click", flipCard, false);
        appMainObj.secondCard.removeEventListener("click", flipCard, false);
        appMainObj.openedCouple++;
        clearCouple();
        if (appMainObj.openedCouple === 8){
            startGame.addEventListener("click", gameStarted,false);
            addPlayersScores();
            stopTimer();
            setTimeout(() => alert("Wiiiiiiiiiiiiiner"));
        }     
    }
    else{
        setTimeout(()=>{
            appMainObj.firstCard.classList.remove("flip");
            appMainObj.secondCard.classList.remove("flip");
            clearCouple();
        },800);
    }
}

    //counting and give class flip
function addCountAndFlip() {
    appMainObj.clickCount++;
    event.currentTarget.classList.add("flip");
}

    // clear card counter and cards
function clearCouple(){
    appMainObj.clickCount = 0;
    appMainObj.firstCard = null;
    appMainObj.secondCard = null;
}
    //stop timer
function stopTimer() {
    clearInterval(timerInterval);
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
    userName.style.borderColor = "initial";
    userName.value = "";
}

    //reset button
function resetAll(){
    stopTimer();
    displayTimer.innerHTML = "Timer: 00:00"
    shuffleandDrow();
    firstPosition();
    clearCouple();
    listingCards();
    appMainObj.allowPlay = false;
    startGame.addEventListener("click", gameStarted,false);
    appMainObj.gamerName = "";
    clearSteps()
}

function checkUserName(){
    if (!userName.value.match(letters)){
        userName.style.borderColor = "red";
        alertDisp.innerText = "Type only letters";
        return false;
    } 
    else if (userName.value.length > 10) {
        userName.style.borderColor = "red";
        alertDisp.innerText = "Type maximum 10 letters";
        return false;
    }
    return true;
}

function clearSteps(){
    appMainObj.counterForScreen = 0;
    displayCount.innerText = "Step: " + appMainObj.counterForScreen;
    appMainObj.openedCouple = 0;
}

    //start button with timer
function gameStarted(){
    shuffleandDrow();
    clearSteps()
    if (checkUserName()){
        appMainObj.allowPlay = true;
        listingCards();
        appMainObj.gamerName = userName.value;
        getPlayersScores();
        firstPosition();
        displayTimer.innerHTML = "Timer: 00:00";
        timerInterval = setInterval(function (){
            appMainObj.timerSeconds ++;
            if (appMainObj.timerSeconds === 60){
                appMainObj.timerMinutes++;
                appMainObj.timerSeconds = 0;
                if (appMainObj.timerMinutes === 60){
                    setTimeout(() => alert("GAME OVER"));
                    resetAll();
                }
            }
            displayTimer.innerHTML = `Timer: ${appMainObj.timerMinutes} : ${appMainObj.timerSeconds}`;
        },1000);
    }
}