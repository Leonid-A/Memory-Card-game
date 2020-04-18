"use strict";

const cardsConteiner = document.getElementById("parent-div");
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
    CounterForScreen: 0
}
start()
function start(){
    shuffleandDrow();
    setuICardItems();
    listenOnClick();
}

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
}

function listenOnClick(){
    for (let i=0, length = appMainObj.uIcardItems.length; i<length; i++) {
        let everyItem = appMainObj.uIcardItems[i];
        everyItem.addEventListener("click", flipCard, false);
    }
}

function flipCard(event){

    if (appMainObj.firstCard === event.currentTarget) {
       return
    }

    if (appMainObj.clickCount === 0){
        addCountandFlip()
        appMainObj.firstCard = event.currentTarget;
    }
    else if (appMainObj.clickCount === 1)  {
        addCountandFlip()
        appMainObj.secondCard = event.currentTarget;
        appMainObj.CounterForScreen++;
        const fId = appMainObj.firstCard.querySelector('.back-side > i').getAttribute("data-id");
        const sId = appMainObj.secondCard.querySelector('.back-side > i').getAttribute("data-id");

        if (fId === sId){
            appMainObj.firstCard.removeEventListener("click", flipCard, false);
            appMainObj.secondCard.removeEventListener("click", flipCard, false);
            appMainObj.winnerArr.push(event.currentTarget);
            clear();
                if (appMainObj.winnerArr.length === 8){
                    console.log(appMainObj.CounterForScreen++);
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

function clear(){
    appMainObj.clickCount = 0;
    appMainObj.firstCard = null;
    appMainObj.secondCard = null;
}

function addCountandFlip() {
    appMainObj.clickCount++;
    event.currentTarget.classList.add("flip");
}