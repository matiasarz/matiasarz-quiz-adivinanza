const buttonPlay = document.querySelector('.buttonPlay');
const startContainer = document.querySelector('.startContainer');
const optionContainer = document.querySelector('.optionContainer');
const gameContainer = document.querySelector('.gameContainer');

const gameContainerTemplate = document.getElementById('gameContainerTemplate');
const gameVsTemplate = document.getElementById('gameVsContainerTemplate');
const gameOverContainerTemplate = document.getElementById(
    'gameOverContainerTemplate'
);
let personas = [];

const getData = async () => {
    const response = await fetch('data.json');
    const data = await response.json();

    return (personas = data);
};

getData();

let id = [];
let contadorPuntos = 0;

const highScore = () => {
    let serializado = JSON.stringify(contadorPuntos);
    localStorage.setItem('puntos', serializado);

    return contadorPuntos;
};

const gameOver = () => {
    gameContainer.textContent = '';
    const cloneGameOver = gameOverContainerTemplate.content.cloneNode(true);
    cloneGameOver.querySelector(
        '.finalScore .score'
    ).textContent = `Your Score ${contadorPuntos}!`;
    contadorPuntos = 0;
    gameContainer.appendChild(cloneGameOver);
    gameContainer.querySelector('.menu').addEventListener('click', menu);
};
const ramdonNumbers = () => {
    idA = Math.ceil(Math.random() * personas.length);
    idB = Math.ceil(Math.random() * personas.length);

    return (id = [idA, idB]);
};

buttonPlay.addEventListener('click', () => {
    const cloneVs = gameVsTemplate.content.cloneNode(true);
    startContainer.replaceChild(cloneVs, buttonPlay);

    ramdonNumbers();

    if (id[0] === id[1]) {
        id[1] = Math.ceil(Math.random() * personas.length);
        afterPlay(id[0], id[1]);
    } else {
        afterPlay(id[0], id[1]);
    }
});

const afterPlay = (idA, idB) => {
    const cloneGameContainer = gameContainerTemplate.content.cloneNode(true);
    const fragment = document.createDocumentFragment();

    let personA = personas.find((persona) => persona.id === idA);
    let personB = personas.find((persona) => persona.id === idB);

    console.log('personaA: ', personA, 'personaB: ', personB);

    if (cloneGameContainer.hasChildNodes()) {
        // imagenes
        cloneGameContainer.querySelector(
            '.firstImage img'
        ).src = `${personA.imgUrl}`;
        cloneGameContainer.querySelector(
            '.secondImage img'
        ).src = `${personB.imgUrl}`;

        // preguntas
        cloneGameContainer.querySelector(
            '.infoFirstImage .name'
        ).textContent = `"${personA.name}"`;

        cloneGameContainer.querySelector(
            '.infoFirstImage .cash'
        ).textContent = `${personA.wealth.toLocaleString('en')}`;

        // nombres
        cloneGameContainer.querySelector(
            '.infoSecondImage .name'
        ).textContent = `"${personB.name}"`;
        cloneGameContainer.querySelector(
            '.infoSecondImage .left'
        ).textContent = `"${personA.name}"`;

        cloneGameContainer.querySelector('.infoFirstImage .score').textContent =
            localStorage.getItem('puntos') === null
                ? `High Score: ` + 0
                : `High Score: ${localStorage.getItem('puntos')}`;
        cloneGameContainer.querySelector(
            '.infoSecondImage .score'
        ).textContent = `Score: ${contadorPuntos}`;
    }
    patrimonios = [personA.wealth, personB.wealth];

    cloneGameContainer
        .querySelector('.infoSecondImage .more')
        .addEventListener('click', richer);
    cloneGameContainer
        .querySelector('.infoSecondImage .less')
        .addEventListener('click', lessMoney);

    fragment.appendChild(cloneGameContainer);
    optionContainer.appendChild(fragment);
    gameContainer.appendChild(optionContainer);
};

const richer = () => {
    ramdonNumbers();
    if (patrimonios[1] > patrimonios[0]) {
        contadorPuntos++;
        optionContainer.textContent = '';
        if (id[0] === id[1]) {
            id[1] = Math.ceil(Math.random() * personas.length);
            console.log('son iguales id1: ', id[0]);
            console.log('son iguales id0: ', id[1]);
            afterPlay(id[0], id[1]);
        } else {
            console.log('id1 sin cambio: ', id[0]);
            console.log('id0 sin cambio: ', id[1]);
            afterPlay(id[0], id[1]);
        }
    } else {
        localStorage.getItem('puntos') > contadorPuntos || highScore();
        gameOver();
    }
};

const lessMoney = () => {
    ramdonNumbers();
    if (patrimonios[1] < patrimonios[0]) {
        contadorPuntos++;
        optionContainer.textContent = '';
        if (id[0] === id[1]) {
            id[1] = Math.ceil(Math.random() * personas.length);
            console.log('son iguales id1: ', id[0]);
            console.log('son iguales id0: ', id[1]);
            afterPlay(id[0], id[1]);
        } else {
            console.log('id1 sin cambio: ', id[0]);
            console.log('id0 sin cambio: ', id[1]);
            afterPlay(id[0], id[1]);
        }
    } else {
        localStorage.getItem('puntos') > contadorPuntos || highScore();
        gameOver();
    }
};

const menu = () => {
    gameContainer.textContent = '';
    startContainer.textContent = '';
    optionContainer.textContent = '';
    startContainer.appendChild(buttonPlay);
    gameContainer.appendChild(startContainer);
};
