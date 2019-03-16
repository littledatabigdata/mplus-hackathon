var wordList = codenames;
var urlCode = window.location.search.substring(1);

// List of colours
var colours = [
  { id: '02', colour: 'red m' },
  { id: '06', colour: 'red m' },
  { id: '07', colour: 'red m' },
  { id: '09', colour: 'red m' },
  { id: '01', colour: 'red f' },
  { id: '11', colour: 'red f' },
  { id: '10', colour: 'red f' },
  { id: '04', colour: 'red f' },
  { id: '12', colour: 'blue m' },
  { id: '16', colour: 'blue m' },
  { id: '08', colour: 'blue m' },
  { id: '20', colour: 'blue m' },
  { id: '15', colour: 'blue f' },
  { id: '22', colour: 'blue f' },
  { id: '03', colour: 'blue f' },
  { id: '24', colour: 'blue f' },
  { id: '21', colour: 'neutral m' },
  { id: '23', colour: 'neutral m' },
  { id: '14', colour: 'neutral m' },
  { id: '13', colour: 'neutral m' },
  { id: '18', colour: 'neutral f' },
  { id: '17', colour: 'neutral f' },
  { id: '19', colour: 'neutral f' },
  { id: '05', colour: 'assassin' }
];
var extraColours = [
  { id: '25', colour: 'red d' },
  { id: '26', colour: 'blue d' }
];
var allColours = [];
for (var i = 0; i < colours.length; i++) {
  allColours.push(colours[i]);
}
for (var i = 0; i < extraColours.length; i++) {
  allColours.push(extraColours[i]);
}

// Starting values
var redRemaining = 0;
var blueRemaining = 0;
var gameEnded = false;
var firstPageLoad = true;
var newColours = colours.slice();
var newWords = codenames.slice();

$(function() {
  // Click button to check colours
  $('#check-button').click(function() {
    $('#game-board').toggleClass('check');
    $('#check-button').toggleClass('button-on');

    if ($(this).hasClass('button-on')) {
      $('#check-button').text('Hide colours');
    } else {
      $('#check-button').text('Show colours');
    }
  });

  // When squares are clicked, add active class, and remove text
  $('body').on('click', '.square', function() {
    $(this).addClass('active');
  });

  // When red or blue clicked, remining figure reduced by 1
  $('body').on('click', '.red:not(.active)', function() {
    redRemaining -= 1;
    $('#red-counter').html(redRemaining);
    if (redRemaining === 0 && gameEnded === false) {
      alert('Red Wins!');
      gameEnded = true;
    }
  });
  $('body').on('click', '.blue:not(.active)', function() {
    blueRemaining -= 1;
    $('#blue-counter').html(blueRemaining);
    if (blueRemaining === 0 && gameEnded === false) {
      alert('Blue Wins!');
      gameEnded = true;
    }
  });

  // Assassin
  $('body').on('click', '.assassin', function() {
    if (gameEnded === false) {
      alert('You were killed by the assassin');
      gameEnded = true;
    }
  });

  // Initial game
  newGame();

  // Click button to bring up new game modal
  $('#newgame-button').click(function() {
    $('.modal-wrap')
      .css('display', 'flex')
      .hide()
      .fadeIn();
  });

  // Select words list
  $('.select-words').on('change', function() {
    var newWordList = window[$(this).val()];
    wordList = newWordList;
  });

  // Click button to start new game
  $('.button-newgame').click(function() {
    newGame();
  });
});

// Add extra colour
function extraColour() {
  var coinFlip = Math.floor(Math.random() * 2) + 1;
  if (coinFlip === 1) {
    redRemaining += 1;
    newColours.push(extraColours[0]);
  } else {
    blueRemaining += 1;
    newColours.push(extraColours[1]);
  }
}

// Shuffle function
function shuffle(array) {
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

// Function to generate codenames
function getNewBoard(words, col) {
  var newBoard = '';
  urlCode = '';

  for (var i = 0; i < 25; i++) {
    newBoard +=
      '<div class="square ' +
      col[i].colour +
      '"><span>' +
      words[i].codename +
      '</span></div>';
    urlCode += words[i].id + col[i].id;
  }

  switch (wordList) {
    case deepUndercover:
      urlCode += 'deep';
      $('.select-words').val('deepUndercover');
      break;
    case duet:
      urlCode += 'duet';
      $('.select-words').val('duet');
      break;
    default:
      urlCode += 'code';
  }

  return newBoard;
}

function getGameInfo(words) {
  for (var i = 0; i < 25; i++) {
    $.each(words, function(n, v) {
      if (v.id == urlCode.substring(i * 4, i * 4 + 2)) {
        newWords.push(v);
      }
    });
    $.each(allColours, function(n, v) {
      if (v.id == urlCode.substring(i * 4 + 2, i * 4 + 4)) {
        newColours.push(v);

        if (v.id === '25') {
          redRemaining += 1;
        }
        if (v.id === '26') {
          blueRemaining += 1;
        }
      }
    });
  }
}

// Start new game
function newGame() {
  // Reset values
  redRemaining = 8;
  blueRemaining = 8;
  gameEnded = false;

  // Game setup
  if (urlCode && firstPageLoad) {
    newColours = [];
    newWords = [];

    urlWordString = urlCode.substring(100, 104);

    switch (urlWordString) {
      case 'deep':
        wordList = deepUndercover;
        break;
      case 'duet':
        wordList = duet;
        break;
      default:
        wordList = codenames;
    }

    getGameInfo(wordList);
  } else {
    newColours = colours.slice();
    newWords = wordList.slice();

    extraColour();
    shuffle(newWords);
    shuffle(newColours);
  }

  // New board
  var newBoard = getNewBoard(newWords, newColours);
  $('#game-board').html(newBoard);

  // Reset remaining values on page
  $('#red-counter').html(redRemaining);
  $('#blue-counter').html(blueRemaining);

  // Hide colours if in check mode
  $('#game-board').removeClass('check');
  $('#check-button').removeClass('button-on');
  $('#check-button').text('Show colours');

  $('.modal-wrap').hide();

  //Set the URL
  firstPageLoad = false;
  $(function() {
    var state = { urlCode: urlCode },
      title = 'Codenames',
      path = '?' + urlCode;
    history.pushState(state, title, path);
  });

  $('.modal-close').click(function() {
    $('.modal-wrap').hide();
  });
}
