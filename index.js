const buttonPlay = document.querySelector('.buttonPlay');
const startContainer = document.querySelector('.startContainer');
const optionContainer = document.querySelector('.optionContainer');
const gameContainer = document.querySelector('.gameContainer');

const gameContainerTemplate = document.getElementById('gameContainerTemplate');
const gameVsTemplate = document.getElementById('gameVsContainerTemplate');
const gameOverContainerTemplate = document.getElementById(
    'gameOverContainerTemplate'
);

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
    const cloneGameOver = gameOverContainerTemplate.content.cloneNode(true);
    cloneGameOver.querySelector(
        '.finalScore .score'
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
    const cloneVs = gameVsTemplate.content.cloneNode(true);
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
    const cloneGame = gameContainerTemplate.content.cloneNode(true);
    const fragment = document.createDocumentFragment();
    if (cloneGame.hasChildNodes()) {
        // imagenes
        cloneGame.querySelector(
            '.firstImage img'
        ).src = `${personas[id1].imagen}`;
        cloneGame.querySelector(
            '.secondImage img'
        ).src = `${personas[id2].imagen}`;

        // preguntas
        cloneGame.querySelector(
            '.infoFirstImage .name'
        ).textContent = `"${personas[id1].nombre}"`;
        // cloneGame.querySelector('.infoFirstImage .has').textContent = `has`;

        cloneGame.querySelector('.infoFirstImage .cash').textContent =
            personas[id1].patrimonio.toLocaleString('en');

        // nombres
        cloneGame.querySelector(
            '.infoSecondImage .name'
        ).textContent = `"${personas[id2].nombre}"`;
        cloneGame.querySelector(
            '.infoSecondImage .left'
        ).textContent = `"${personas[id1].nombre}"`;

        cloneGame.querySelector('.infoFirstImage .score').textContent =
            localStorage.getItem('puntos') === null
                ? `High Score: ` + 0
                : `High Score: ${localStorage.getItem('puntos')}`;
        cloneGame.querySelector(
            '.infoSecondImage .score'
        ).textContent = `Score: ${contadorPuntos}`;
    }
    patrimonios = [personas[id1].patrimonio, personas[id2].patrimonio];

    cloneGame
        .querySelector('.infoSecondImage .more')
        .addEventListener('click', richer);
    cloneGame
        .querySelector('.infoSecondImage .less')
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

// https://i.ibb.co/9ZNcqnY/rock.jpg
// https://i.ibb.co/SyKp4Nt/ryan.jpg
// https://i.ibb.co/C7B306F/smokers.jpg
// https://i.ibb.co/B45HCwP/taylor.jpg
// https://i.ibb.co/hM4pjnd/totti.jpg
// https://i.ibb.co/LhbLhZQ/zatlan.jpg
// https://i.ibb.co/J3zYMTY/bale.jpg
// https://i.ibb.co/FsNJPyM/beckham.jpg
// https://i.ibb.co/x65cpPF/ben.jpg
// https://i.ibb.co/xCqpFp8/billie.jpg
// https://i.ibb.co/s5ZT0wd/bolkhia.jpg
// https://i.ibb.co/G2g7y1J/conor.jpg
// https://i.ibb.co/GnV6gQC/cristiano.jpg
// https://i.ibb.co/F0tq5yj/curry.jpg
// https://i.ibb.co/c2vprLz/diesel.jpg
// https://i.ibb.co/wdwXr5C/drake.jpg
// https://i.ibb.co/715HW6v/durant.jpg
// https://i.ibb.co/93f9T01/edsheeran.jpg
// https://i.ibb.co/sJJXhsS/federer.jpg
// https://i.ibb.co/b2v9bsh/flamini.jpg
// https://i.ibb.co/HXMVrNN/gordon.jpg
// https://i.ibb.co/qgvrfkP/grande.jpg
// https://i.ibb.co/2F0mY0z/iniesta.jpg
// https://i.ibb.co/TBYJ7bp/jk.jpg
// https://i.ibb.co/vZgGhdS/jonas.jpg
// https://i.ibb.co/hcYXGmX/lebron.jpg
// https://i.ibb.co/Nxrq8R2/mendez.jpg
// https://i.ibb.co/6DntMss/messi.jpg
// https://i.ibb.co/6ZCVR8j/neymar.jpg
// https://i.ibb.co/bPTn8td/patterson.jpg
