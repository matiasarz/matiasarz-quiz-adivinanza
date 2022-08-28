const buttonPlay = document.querySelector('.buttonPlay');
const startContainer = document.querySelector('.startContainer');
const optionContainer = document.querySelector('.optionContainer');
const gameContainer = document.querySelector('.gameContainer');

const templateGame = document.getElementById('game-template');
const templateVs = document.getElementById('game-vs');
const templateGameOver = document.getElementById('game-over-template');

class Persona {
    constructor(nombre, patrimonio, img) {
        this.nombre = nombre;
        this.patrimonio = patrimonio;
        this.imagen = img;
    }
}

const personas = [];

personas.push(new Persona('Francesco Totti', 89000000, 'imagenes/totti.jpg'));
personas.push(new Persona('Mathieu Flamini', 97000000, 'imagenes/flamini.jpg'));
personas.push(new Persona('Andrés Iniesta', 106000000, 'imagenes/iniesta.jpg'));
personas.push(new Persona('Gareth Bale', 124000000, 'imagenes/bale.jpg'));
personas.push(new Persona('Neymar', 164000000, 'imagenes/neymar.jpg'));
personas.push(
    new Persona('Zlatan Ibrahimovic', 168000000, 'imagenes/zatlan.jpg')
);
personas.push(new Persona('Lionel Messi', 355000000, 'imagenes/messi.jpg'));
personas.push(new Persona('David Beckham', 400000000, 'imagenes/beckham.jpg'));
personas.push(
    new Persona('Cristiano Ronaldo', 1000000000, 'imagenes/cristiano.jpg')
);
personas.push(new Persona('Faiq Bolkiah', 1800000000, 'imagenes/bolkhia.jpg'));
personas.push(new Persona('Roger Federer', 106300000, 'imagenes/federer.jpg'));
personas.push(new Persona('Lebron James', 88200000, 'imagenes/lebron.jpg'));
personas.push(
    new Persona("Dwayne Johnson 'The Rock'", 87500000, 'imagenes/rock.jpg')
);
personas.push(
    new Persona('James Patterson', 80000000, 'imagenes/patterson.jpg')
);
personas.push(new Persona('Stephen Curry', 74400000, 'imagenes/curry.jpg'));
personas.push(new Persona('Ariana Grande', 72000000, 'imagenes/grande.jpg'));
personas.push(new Persona('Ryan Reynolds', 71500000, 'imagenes/ryan.jpg'));
personas.push(new Persona('Gordon Ramsay', 70000000, 'imagenes/gordon.jpg'));
personas.push(new Persona('Jonas Brothers', 68500000, 'imagenes/jonas.jpg'));
personas.push(
    new Persona('The Chainsmokers', 68000000, 'imagenes/smokers.jpg')
);
personas.push(new Persona('Ed Sheeran', 64000000, 'imagenes/edsheeran.jpg'));
personas.push(new Persona('Kevin Durant', 63900000, 'imagenes/durant.jpg'));
personas.push(new Persona('Taylor Swift', 63500000, 'imagenes/taylor.jpg'));
personas.push(new Persona('J.K. Rowlilng', 60000000, 'imagenes/jk.jpg'));
personas.push(new Persona('Ben Affleck', 55000000, 'imagenes/ben.jpg'));
personas.push(new Persona('Shawn Mendes', 54500000, 'imagenes/mendez.jpg'));
personas.push(new Persona('Vin Diesel', 54000000, 'imagenes/diesel.jpg'));
personas.push(new Persona('Bilie Elish', 53000000, 'imagenes/billie.jpg'));
personas.push(new Persona('Drake', 49000000, 'imagenes/drake.jpg'));
personas.push(new Persona('Conor Mcgregor', 48000000, 'imagenes/conor.jpg'));

let id = [];
let contadorPuntos = 0;
let patrimonios = [];

const highScore = () => {
    let serializado = JSON.stringify(contadorPuntos);
    localStorage.setItem('puntos', serializado);

    return contadorPuntos;
};

const gameOver = () => {
    gameContainer.textContent = '';
    const cloneGameOver = templateGameOver.content.cloneNode(true);
    cloneGameOver.querySelector(
        '.final-score .score'
    ).textContent = `Your Score ${contadorPuntos}!`;
    contadorPuntos = 0;
    gameContainer.appendChild(cloneGameOver);
    gameContainer.querySelector('.menu').addEventListener('click', menu);
};
const ramdonNumbers = () => {
    id1 = Math.floor(Math.random() * personas.length);
    id2 = Math.floor(Math.random() * personas.length);

    return (id = [id1, id2]);
};

buttonPlay.addEventListener('click', () => {
    const cloneVs = templateVs.content.cloneNode(true);
    startContainer.replaceChild(cloneVs, buttonPlay);

    ramdonNumbers();

    if (id[0] === id[1]) {
        id[1] = Math.floor(Math.random() * personas.length);
        afterPlay(id[0], id[1]);
    } else {
        afterPlay(id[0], id[1]);
    }
});

const afterPlay = (id1, id2) => {
    const cloneGame = templateGame.content.cloneNode(true);
    const fragment = document.createDocumentFragment();
    if (cloneGame.hasChildNodes()) {
        cloneGame.querySelector(
            '.pregunta-1 img'
        ).src = `${personas[id1].imagen}`;
        cloneGame.querySelector(
            '.pregunta-2 img'
        ).src = `${personas[id2].imagen}`;

        cloneGame.querySelector(
            '.name-one .full-name'
        ).textContent = `"${personas[id1].nombre}"`;
        cloneGame.querySelector('.name-one .has').textContent = `has`;

        cloneGame.querySelector('.name-one .cash').textContent =
            personas[id1].patrimonio.toLocaleString('en');

        cloneGame.querySelector(
            '.options .name-two'
        ).textContent = `"${personas[id2].nombre}"`;
        cloneGame.querySelector(
            '.options .left'
        ).textContent = `"${personas[id1].nombre}"`;

        cloneGame.querySelector('.name-one .h3-3').textContent =
            localStorage.getItem('puntos') === null
                ? `High Score: ` + 0
                : `High Score: ${localStorage.getItem('puntos')}`;
        cloneGame.querySelector(
            '.options .h3-4'
        ).textContent = `Score: ${contadorPuntos}`;
    }
    patrimonios = [personas[id1].patrimonio, personas[id2].patrimonio];

    cloneGame
        .querySelector('.options .richer')
        .addEventListener('click', richer);
    cloneGame
        .querySelector('.options .less-money')
        .addEventListener('click', lessMoney);

    fragment.appendChild(cloneGame);
    optionContainer.appendChild(fragment);
    gameContainer.appendChild(optionContainer);
};

const richer = () => {
    ramdonNumbers();
    if (patrimonios[1] > patrimonios[0]) {
        contadorPuntos++;
        optionContainer.textContent = '';
        if (id[0] === id[1]) {
            id[1] = Math.floor(Math.random() * personas.length);
            afterPlay(id[0], id[1]);
        } else {
            afterPlay(id[0], id[1]);
        }
    } else {
        localStorage.getItem('puntos') > contadorPuntos
            ? console.log('lo que esta en el ls es mayor')
            : highScore();
        gameOver();
    }
};

const lessMoney = () => {
    ramdonNumbers();
    if (patrimonios[1] < patrimonios[0]) {
        contadorPuntos++;
        optionContainer.textContent = '';
        if (id[0] === id[1]) {
            id[1] = Math.floor(Math.random() * personas.length);
            afterPlay(id[0], id[1]);
        } else {
            afterPlay(id[0], id[1]);
        }
    } else {
        localStorage.getItem('puntos') > contadorPuntos
            ? console.log('lo que esta en el ls es mayor')
            : highScore();
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
