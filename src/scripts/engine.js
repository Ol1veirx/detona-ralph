const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector(".lifePlayer")
    },
    values:{
        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lifePlayer: 3, 
    },
    actions:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function randomSquare(){
    // Remove de cada class "square" o valor "enemy"
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    // Gera um numero aleatorio entre 1 e 9
    let randomNumber = Math.floor(Math.random() * 9);
    // adicionar o valor "enemy" em cada "square"
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// Função para tocar sons dentro do código
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.01;
    audio.play();
}

function moveEnemy(){
    // Adiciona o valor "enemy" a cada milisegundos 
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

// Função para contar os clicks certos
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

// Contador do tempo
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId)
        alert(`Game Over! O seu resultado foi: ${state.values.result}`);
    }
}

// Função principal
function main(){
    moveEnemy();
    addListenerHitBox();
}

main();