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
  { class: 'bystander m' },
  { class: 'bystander m' },
  { class: 'bystander m' },
  { class: 'bystander m' },
  { class: 'bystander f' },
  { class: 'bystander f' },
  { class: 'bystander f' },
  { class: 'assassin' }
];

const extraColours = [{ class: 'red d' }, { class: 'blue d' }];

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

function generateBoard(imageIds) {
  console.log('generating board');
  let gameBoard = document.getElementById('game-board');
  let newColours = getNewGameColours();
  console.log('new colors before');
  console.log(newColours);

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

  console.log('new colors');
  console.log(newColours);
}

function createOffset() {
  let offset = document.createElement('div');
  offset.setAttribute(
    'class',
    'mdc-layout-grid__cell mdc-layout-grid__cell--span-1'
  );
  return offset;
}

function createCard(id, colour) {
  let card = document.createElement('div');
  card.setAttribute('class', 'mdc-card active ' + colour.class);

  let cardAction = document.createElement('mdc-card');
  cardAction.setAttribute('class', 'mdc-card__primary-action');
  cardAction.setAttribute('tabindex', '0');

  let img = new Image();
  img.setAttribute('class', 'img-card');
  getImageUrl(id).then(url => {
    // console.log(url);
    img.src = url;
  });
  cardAction.appendChild(img);

  card.appendChild(cardAction);
  return card;
}

window.onload = getRandomImages().then(imageIds => generateBoard(imageIds));
