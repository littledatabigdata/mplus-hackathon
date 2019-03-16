function generateBoard() {
  console.log('generating board');
  let gameBoard = document.getElementById('game-board');
  for (var i = 0; i < 5; ++i) {
    let grid = createRow();
    gameBoard.appendChild(grid);
  }
}

function createRow() {
  let grid = document.createElement('div');
  grid.setAttribute('class', 'mdc-layout-grid');

  let gridInner = document.createElement('div');
  gridInner.setAttribute('class', 'mdc-layout-grid__inner');

  gridInner.appendChild(createOffset());
  for (var i = 0; i < 5; ++i) {
    let gridCell = document.createElement('div');
    gridCell.setAttribute(
      'class',
      'mdc-layout-grid__cell mdc-layout-grid__cell--span-2'
    );

    let card = createCard();
    gridCell.appendChild(card);
    gridInner.appendChild(gridCell);
  }
  gridInner.appendChild(createOffset());

  grid.appendChild(gridInner);
  return grid;
}

function createOffset() {
  let offset = document.createElement('div');
  offset.setAttribute(
    'class',
    'mdc-layout-grid__cell mdc-layout-grid__cell--span-1'
  );
  return offset;
}

function createCard() {
  let card = document.createElement('div');
  card.setAttribute('class', 'mdc-card');

  let cardAction = document.createElement('mdc-card');
  cardAction.setAttribute('class', 'mdc-card__primary-action');
  cardAction.setAttribute('tabindex', '0');
  cardAction.innerHTML = 'Card';

  card.appendChild(cardAction);
  return card;
}

window.onload = generateBoard();
