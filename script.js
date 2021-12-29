let order = [];
let clickedOrder = [];
let score = -1;

/*
0-red
1-green
2-blue
3-yellow
*/

const scoreBoard = document.querySelector('.score');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);

    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);

        lightColor(elementColor, Number(i) + 1);
    }
}

let lightColor = (element, number) => {
    number = number * 500;

    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }

    if (clickedOrder.length == order.length) {
        //alert(`Pontuação: ${score}!\nVocê acertou! Inicializando próximo nível!`);
        setTimeout(()=>{
            nextLevel();
        }, 1000);
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

let createColorElement = (color) => {
    if (color == 0) return red;
    else if (color == 1) return green;
    else if (color == 2) return blue;
    else if (color == 3) return yellow;
}

let nextLevel = () => {
    score++;
    scoreBoard.textContent = `Pontuação: ${score}`;
    shuffleOrder();
}

let gameOver = () => {
    alert(`Pontuação: ${score}! Você perdeu o jogo! Clique em Ok para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    score = -1;
    scoreBoard.textContent = `Pontuação: 0`;

    nextLevel();
}

let playGame = () => {
    alert(`Bem vindo ao Genius! Iniciando novo jogo`);
    score = -1;
    scoreBoard.textContent = `Pontuação: 0`;

    nextLevel();
}

red.onclick = () => click(0);
green.onclick = () => click(1);
blue.onclick = () => click(2);
yellow.onclick = () => click(3);

playGame();