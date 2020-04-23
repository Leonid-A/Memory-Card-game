function addPlayersScores(){
    let winnersOutput = winnersList.innerHTML;
    winnersOutput +="<p class='table-name'>" + appMainObj.gamerName + "</p><p class='table-time'>"+ appMainObj.timerMinutes + ":"+ appMainObj.timerSeconds + "</p><p class='table-steps'>" + appMainObj.CounterForScreen + "</p>";
    winnersList.innerHTML = winnersOutput;
    if (players === null){
        writePlayer();
        players =[appMainObj.newPlayer];   //datark arrayin chem kara pus anem?
    }
    else{
    const index = players.findIndex(({name})=> name === appMainObj.gamerName);
        if (index !== -1){
            const playerScore = {
                minutes:appMainObj.timerMinutes,
                seconds:appMainObj.timerSeconds,
                steps:appMainObj.CounterForScreen
            };
            players[index].scores.push(playerScore);
        }
        else{
        writePlayer();
            players.push(appMainObj.newPlayer);
        }
    }
    let playersObj = JSON.stringify(players);
    localStorage.setItem("winners", playersObj);
}

function getPlayersScores(){
    let winnersOutput = "";
    let playersObj = localStorage.getItem("winners");
    players = JSON.parse(playersObj);
    if (players === null){
          return;
    };
    const gamingPlayer = players.find(person => person.name == appMainObj.gamerName);
    if ( gamingPlayer !== undefined){
        gamingPlayer.scores.forEach(item => {
            winnersOutput +="<p class='table-name'>" + gamingPlayer.name + "</p><p class='table-time'>"+ item.minutes + ":"+ item.seconds + "</p><p class='table-steps'>" + item.steps + "</p>";
        });
    }
    else{
        players.forEach(element => {
            element.scores.forEach(item => {
                winnersOutput +="<p class='table-name'>" + element.name + "</p><p class='table-time'>"+ item.minutes + ":"+ item.seconds + "</p><p class='table-steps'>" + item.steps + "</p>";
            })
        })
    };
    winnersList.innerHTML = winnersOutput;    
};

function writePlayer(){
    appMainObj.newPlayer = {
        name:appMainObj.gamerName,
        scores:[{
            minutes:appMainObj.timerMinutes,
            seconds:appMainObj.timerSeconds,
            steps:appMainObj.CounterForScreen
        }]
    };
};