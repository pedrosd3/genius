let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const cimaEsquerda = document.querySelector("#cimaEsquerda");
const cimaDireita = document.querySelector("#cimaDireita");
const baixoEsquerda = document.querySelector("#baixoEsquerda");
const baixoDireita = document.querySelector("#baixoDireita");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
})

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    cimaEsquerda.style.backgroundColor = "#90EE90";
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    cimaDireita.style.backgroundColor = "#FA8072";
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    baixoEsquerda.style.backgroundColor = "#EEE8AA";
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    baixoDireita.style.backgroundColor = "#87CEFA";
}

function clearColor() {
    cimaEsquerda.style.backgroundColor = "#32CD32";
    cimaDireita.style.backgroundColor = "#DC143C";
    baixoEsquerda.style.backgroundColor = "#FFD700";
    baixoDireita.style.backgroundColor = "#2456c2";
}

function flashColor() {
    cimaEsquerda.style.backgroundColor = "#90EE90";
    cimaDireita.style.backgroundColor = "#FA8072";
    baixoEsquerda.style.backgroundColor = "#EEE8AA";
    baixoDireita.style.backgroundColor = "#87CEFA";
}
cimaEsquerda.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
cimaDireita.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
baixoEsquerda.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})
baixoDireita.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length == 20 && good) {
        winGame();
    }

    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "👎"
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "🥇"
    on = false;
    win = true;
}