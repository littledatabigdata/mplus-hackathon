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
let showSpymaster = false;

function newGame() {
  redRemaining = 0;
  blueRemaining = 0;
  gameEnded = false;
  clearBoard();
  const categoryList = document.getElementById('categories-list');
  const category = categoryList.options[categoryList.selectedIndex].value;
  const seedInput = document.getElementById('seed-input').value;
  getRandomImages(category, 25, seedInput).then(imageData =>
    generateBoard(imageData)
  );
}

function shuffle(array, seed) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  seed = seed || 1;
  let random = function() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getNewGameColours() {
  let newColours = colours.slice();

  // Randomize the double agent
  var coinFlip = Math.round(Math.random()); // random number 0 or 1
  newColours.push(extraColours[coinFlip]);
  return shuffle(newColours);
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

function generateBoard(imageData) {
  console.log('generating board');
  let gameBoard = document.getElementById('game-board');
  let newColours = getNewGameColours();
  initializeRemaining(newColours);
  document.getElementById('red-counter').innerHTML = redRemaining;
  document.getElementById('blue-counter').innerHTML = blueRemaining;

  for (var i = 0; i < 25; ++i) {
    let colour = newColours.pop();
    let {id, alt} = imageData.pop();
    let card = createCard(id, colour, alt);
    gameBoard.appendChild(card);
  }
}

function onCardClicked(colour) {
  return function() {
    if (!showSpymaster && !this.classList.contains('active')) {
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

function createCard(id, colour, alt="") {
  let card = document.createElement('div');
  card.setAttribute(
    'class',
    'mdc-card mdc-elevation-transition ' + colour.class
  );
  card.addEventListener('click', onCardClicked(colour));

  let cardAction = document.createElement('div');
  cardAction.setAttribute('class', 'mdc-card__primary-action');
  cardAction.setAttribute('tabindex', '0');

  let img = new Image();
  img.setAttribute('class', 'img-card');
  img.alt = alt
  getImageUrl(id).then(url => {
    // console.log(url);
    img.src = url;
  });

  cardAction.appendChild(img);
  card.appendChild(cardAction);
  return card;
}

window.onload = (function() {
  document
    .getElementById('newgame-button')
    .addEventListener('click', function() {
      document.getElementById('modal-wrap').style.display = 'flex';
    });
  Array.from(document.getElementsByClassName('modal-close')).forEach(elem => {
    elem.addEventListener('click', function() {
      document.getElementById('modal-wrap').style.display = 'none';
    });
  });
  document.getElementById('check-button').addEventListener('click', function() {
    showSpymaster = !showSpymaster;
    this.classList.toggle('button-on');
    this.innerHTML = showSpymaster ? 'Show Spymaster' : 'Show Player';
    document.getElementById('game-board').classList.toggle('check');
  });
  document
    .getElementById('button-newgame')
    .addEventListener('click', function() {
      document.getElementById('modal-wrap').style.display = 'none';
      newGame();
    });
})();
