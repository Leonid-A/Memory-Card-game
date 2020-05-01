"use strict";

const cardsConteiner = document.getElementById("parent-div");
const displayCount = document.getElementById("step");
const displayTimer = document.getElementById("timer");
const startGame = document.getElementById("st-button");
const fullReset = document.getElementById("res-button");
const alertDisp = document.getElementById("alert-place");
let userName = document.getElementById("fname");
const winnersList = document.getElementById("user-scores");
const bestScoresDisplay = document.getElementById("best-scores");
const screenChange = document.getElementsByClassName("screen-change");
const winAlert = document.getElementsByClassName("win-alert");
const playAgain = document.getElementById("play-again");
const endGame = document.getElementById("end-game");
const letters = /^[a-zA-Z]+$/;
let players = [];
let bestScores = [];
let timerInterval;
const bodyAll = document.body;
const appMainObj = {
    cardsImageStoreage: [
        '<i data-id="1" class="fas fa-poo"></i>', 
        '<i data-id="2" class="fas fa-hand-holding-usd"></i>',
        '<i data-id="3" class="fas fa-dove"></i>',
        '<i data-id="4" class="fas fa-baby-carriage"></i>',
        '<i data-id="5" class="fas fa-grin-tongue"></i>',
        '<i data-id="6" class="fas fa-hand-peace"></i>',
        '<i data-id="7" class="fas fa-anchor"></i>',
        '<i data-id="8" class="fas fa-dragon"></i>',
        '<i data-id="9" class="fas fa-bell"></i>',
        '<i data-id="10" class="fas fa-bicycle"></i>',
        '<i data-id="11" class="fas fa-bomb"></i>',
        '<i data-id="12" class="fas fa-bullhorn"></i>',
        '<i data-id="13" class="fas fa-cannabis"></i>',
        '<i data-id="14" class="fas fa-carrot"></i>',
        '<i data-id="15" class="fas fa-charging-station"></i>',
        '<i data-id="16" class="fas fa-apple-alt"></i>',
        '<i data-id="17" class="fas fa-car"></i>',
        '<i data-id="18" class="fas fa-cut"></i>',
        '<i data-id="19" class="fas fa-fighter-jet"></i>',
        '<i data-id="20" class="fas fa-frog"></i>',
        '<i data-id="21" class="fas fa-glass-cheers"></i>',
        '<i data-id="22" class="fas fa-spider"></i>',
        '<i data-id="23" class="fas fa-key"></i>',
        '<i data-id="24" class="fas fa-smoking"></i>'
    ],
    cardsImages: [],
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
    newPlayer: {},
    cupArr:['<i class="fas fa-trophy gold"></i>','<i class="fas fa-trophy silver"></i>','<i class="fas fa-trophy bronze"></i>']
}

start()
    // game started
function start(){
    shuffleCardsStoreage()
    setuICardItems();
    listenOnClick();
    drawBestScores();
    fullReset.addEventListener("click", resetAll,false);
    startGame.addEventListener("click", gameStarted,false);
    playAgain.addEventListener("click", startAgain,false);
    endGame.addEventListener("click", resetAll,false);
    userName.addEventListener('keypress', enter, false );
}

function enter(b) {
    if (b.key === 'Enter') {
        gameStarted();        
    }
}

function shuffleCardsStoreage(){
    for(let hertakanItem, i=appMainObj.cardsImageStoreage.length-1; i>-1; --i){
        const numRndm = parseInt(Math.random() * i);
        hertakanItem = appMainObj.cardsImageStoreage[i];
        appMainObj.cardsImageStoreage[i] = appMainObj.cardsImageStoreage[numRndm];
        appMainObj.cardsImageStoreage[numRndm] = hertakanItem;
    }
    appMainObj.cardsImages = appMainObj.cardsImageStoreage.slice(10,18);
    appMainObj.cardsImages.push.apply(appMainObj.cardsImages,appMainObj.cardsImages)
    shuffleandDrow();
}

    // cards shuffle and taking all card by className
function shuffleandDrow() {
    let allCards = ""; 
    const imgs = appMainObj.cardsImages;
    for(let hertakanItem, i = imgs.length-1; i > -1; --i){
        const numRndm = parseInt(Math.random() * i);
        hertakanItem = imgs[i];
        imgs[i] = imgs[numRndm];
        imgs[numRndm] = hertakanItem;
        allCards += `<div class='card-item'><span class='front-side'>${appMainObj.frontImage}</span><span class='back-side'>${imgs[i]}</span></div>` ;
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
            userName.style.borderColor = "red";
            alertDisp.innerText = "Please type your name";
            return;
        } 
        addCountAndFlip()
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
            startGame.removeAttribute("disabled");
            userName.removeAttribute("disabled");
            addPlayersScores();
            addBestScores();
            stopTimer();
            alertShow();
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

function alertShow(){
    screenChange[0].classList.add("screen-change-active");
    winAlert[0].classList.add("win-alert-active");
    bodyAll.style.overflow = "hidden";
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
    userName.style.borderColor = "initial";
    userName.value = "";
}

    //reset button
function resetAll(){
    bodyAll.style.overflow = "visible";
    screenChange[0].classList.remove("screen-change-active");
    winAlert[0].classList.remove("win-alert-active");
    stopTimer();
    displayTimer.innerHTML = "Timer: 0m 0s"
    shuffleCardsStoreage();
    firstPosition();
    alertDisp.innerText = "";
    clearCouple();
    listingCards();
    appMainObj.allowPlay = false;
    startGame.addEventListener("click", gameStarted,false);
    startGame.removeAttribute("disabled");
    userName.removeAttribute("disabled");
    appMainObj.gamerName = "";
    clearSteps()
    winnersList.innerHTML = "";
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

function startAgain(){
    userName.value = appMainObj.gamerName;
    screenChange[0].classList.remove("screen-change-active");
    winAlert[0].classList.remove("win-alert-active");
    bodyAll.style.overflow = "visible";
    gameStarted();
}

    //start button with timer
function gameStarted(){
    shuffleCardsStoreage();
    clearSteps()
    if (checkUserName()){
        alertDisp.innerText = "Hello " + userName.value;
        appMainObj.allowPlay = true;
        startGame.removeEventListener("click", gameStarted, false);
        startGame.setAttribute("disabled",true)
        userName.setAttribute("disabled",true)
        listingCards();
        appMainObj.gamerName = userName.value;
        getPlayersScores();
        firstPosition();
        displayTimer.innerHTML = "Timer: 0m 0s";
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
            displayTimer.innerHTML = `Timer: ${appMainObj.timerMinutes}m ${appMainObj.timerSeconds}s`;
        },1000);
    }
}