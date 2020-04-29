function addPlayersScores(){
    let index = -1;
    if (players){
        index = players.findIndex(({name}) => name === appMainObj.gamerName);
    }
    else{
        players = [];
    }
    
    if (index === -1) {
        index = players.length;
        players[index] = {
            name:appMainObj.gamerName,
            scores: []
        }
    }
    sortByIncrement(index);
    sliceToTen(index);
    drawWinnersTable(players[index]);
    localStorage.setItem("winners", JSON.stringify(players));
}

function sortByIncrement(index){
    let scoreIndex;
    appMainObj.timerSeconds+=appMainObj.timerMinutes*60  ;
    const playerScore = {
        seconds: appMainObj.timerSeconds,
        steps: appMainObj.counterForScreen
    };
    if (players[index].scores.length > 1){
            scoreIndex = players[index].scores.findIndex(item => {
            if ((item.seconds*item.steps) > (appMainObj.timerSeconds * appMainObj.counterForScreen)){return true};
        });
        if (scoreIndex !== -1){
        players[index].scores.splice(scoreIndex,0,playerScore);
        return;
        }
    }
    players[index].scores.push(playerScore);
}

function sliceToTen(index){
    if (players[index].scores.length>10){
        players[index].scores= players[index].scores.slice(0,10);
    }
}

function getPlayersScores(){
    players = JSON.parse(localStorage.getItem("winners"));
    if (players === null){
        return;
    };
    const gamingPlayer = players.find(person => person.name == appMainObj.gamerName);
    drawWinnersTable(gamingPlayer)
};

function drawWinnersTable(gamingPlayer) {
    let winnersOutput = '';
    if (gamingPlayer){
        gamingPlayer.scores.forEach(item => {
            let minutes = parseInt(item.seconds/60);
            let seconds = item.seconds%60;
            winnersOutput +=`<p class='user-name'>${gamingPlayer.name}</p><p class='user-time'>${minutes}m ${seconds}s</p><p class='user-steps'>${item.steps}</p>`;
        });
    } 
    winnersList.innerHTML = winnersOutput;
}

function addBestScores(){
    const newBest = {
        name: appMainObj.gamerName,
        scores: {
            seconds:appMainObj.timerSeconds,
            steps: appMainObj.counterForScreen
        } 
    }
    let bestScoreIndex = -1;
    if(bestScores){
        bestScoreIndex = bestScores.findIndex(element => {
            if (element.scores.seconds*element.scores.steps>appMainObj.timerSeconds*appMainObj.counterForScreen){
                return true;
            }
        });
    }
    else{
        bestScores = [];
    };

    if (bestScoreIndex === -1){
        bestScores.push(newBest);
    }
    else{
        bestScores.splice(bestScoreIndex,0,newBest);
    };

    if (bestScores.length >3) {
        bestScores = bestScores.slice(0,3);  
    };
    localStorage.setItem("bestScores", JSON.stringify(bestScores));
    drawBestScores();
}

function drawBestScores() {
    bestScores = JSON.parse(localStorage.getItem("bestScores"));
    let bestScoresOutput = "";
    if (bestScores){
        bestScores.forEach((item,index) => {
            let minutes = parseInt(item.scores.seconds/60);
            let seconds = item.scores.seconds%60;
            bestScoresOutput+= `<p class='user-img-b'>${index+1}. ${appMainObj.cupArr[index]}</p><p class='user-name-b'>${item.name}</p><p class='user-time-b'>${minutes}m ${seconds}s</p><p class='user-steps-b'>${item.scores.steps}</p>`;
        })
    }
    bestScoresDisplay.innerHTML =  bestScoresOutput;
}