const colours = [
  { class: 'red m' },
  { class: 'red m' },
  { class: 'red m' },
  { class: 'red m' },
  { class: 'red f' },
  { class: 'red f' },
  { class: 'red f' },
  { class: 'red f' },
  { class: 'blue m' },
  { class: 'blue m' },
  { class: 'blue m' },
  { class: 'blue m' },
  { class: 'blue f' },
  { class: 'blue f' },
  { class: 'blue f' },
  { class: 'blue f' },
  { class: 'neutral m' },
  { class: 'neutral m' },
  { class: 'neutral m' },
  { class: 'neutral m' },
  { class: 'neutral f' },
  { class: 'neutral f' },
  { class: 'neutral f' },
  { class: 'assassin' }
];

const extraColours = [{ class: 'red d' }, { class: 'blue d' }];

let redRemaining = 0;
let blueRemaining = 0;
let gameEnded = false;

function newGame() {
  redRemaining = 0;
  blueRemaining = 0;
  gameEnded = false;
  clearBoard();
  getRandomImages().then(imageIds => generateBoard(imageIds));
}

function shuffle(array) {
  // todo: shuffle using a seed
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getNewGameColours() {
  let newColours = shuffle(colours.slice());

  // Randomize the double agent
  var coinFlip = Math.round(Math.random()); // random number 0 or 1
  newColours.push(extraColours[coinFlip]);
  return newColours;
}

function initializeRemaining(newColours) {
  newColours.forEach(colour => {
    if (colour.class[0] === 'r') {
      redRemaining += 1;
    } else if (colour.class[0] === 'b') {
      blueRemaining += 1;
    }
  });
}

function clearBoard() {
  let gameBoard = document.getElementById('game-board');
  while ((last = gameBoard.lastChild)) gameBoard.removeChild(last);
}

function generateBoard(imageIds) {
  console.log('generating board');
  let gameBoard = document.getElementById('game-board');
  let newColours = getNewGameColours();
  initializeRemaining(newColours);
  document.getElementById('red-counter').innerHTML = redRemaining;
  document.getElementById('blue-counter').innerHTML = blueRemaining;

  for (var i = 0; i < 5; ++i) {
    let grid = document.createElement('div');
    grid.setAttribute('class', 'mdc-layout-grid');

    let gridInner = document.createElement('div');
    gridInner.setAttribute('class', 'mdc-layout-grid__inner');

    gridInner.appendChild(createOffset());
    for (var j = 0; j < 5; ++j) {
      let gridCell = document.createElement('div');
      gridCell.setAttribute(
        'class',
        'mdc-layout-grid__cell mdc-layout-grid__cell--span-2'
      );

      let colour = newColours.pop();
      let id = imageIds.pop();
      let card = createCard(id, colour);
      gridCell.appendChild(card);
      gridInner.appendChild(gridCell);
    }
    gridInner.appendChild(createOffset());

    grid.appendChild(gridInner);
    gameBoard.appendChild(grid);
  }
}

function createOffset() {
  let offset = document.createElement('div');
  offset.setAttribute(
    'class',
    'mdc-layout-grid__cell mdc-layout-grid__cell--span-1'
  );
  return offset;
}

function onCardClicked(colour) {
  return function() {
    if (!this.classList.contains('active')) {
      this.classList.add('active');

      if (colour.class[0] === 'r') {
        redRemaining -= 1;
        document.getElementById('red-counter').innerHTML = redRemaining;
        if (redRemaining === 0 && gameEnded === false) {
          alert('Red Wins!');
          gameEnded = true;
        }
      } else if (colour.class[0] === 'b') {
        blueRemaining -= 1;
        document.getElementById('blue-counter').innerHTML = blueRemaining;
        if (blueRemaining === 0 && gameEnded === false) {
          alert('Blue Wins!');
          gameEnded = true;
        }
      } else if (colour.class[0] === 'a') {
        if (gameEnded === false) {
          alert('You were killed by the assassin.');
          gameEnded = true;
        }
      }
    }
  };
}

function createCard(id, colour) {
  let card = document.createElement('div');
  card.setAttribute('class', 'mdc-card ' + colour.class);
  card.addEventListener('click', onCardClicked(colour));

  let cardAction = document.createElement('mdc-card');
  cardAction.setAttribute('class', 'mdc-card__primary-action');
  cardAction.setAttribute('tabindex', '0');

  let img = new Image();
  img.setAttribute('class', 'img-card');
  getImageUrl(id).then(url => {
    console.log(url);
    img.src = url;
  });
  cardAction.appendChild(img);

  card.appendChild(cardAction);
  return card;
}

window.onload = (function() {
  document.getElementById('newgame-button').addEventListener('click', newGame);
  document.getElementById('check-button').addEventListener('click', function() {
    this.innerHTML =
      this.innerHTML === 'Show Spymaster' ? 'Show Player' : 'Show Spymaster';
    document.getElementById('game-board').classList.toggle('check');
  });
  newGame();
})();
