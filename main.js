var express = require('express')
var axios = require('axios')
var cors = require('cors')
var app = express()

const MAX_COUNT = 5125

let collections = axios.create({
    baseURL: 'https://collections.mplus.org.hk/en/objects',
    responseType: 'document'
})
 
app.use(cors())

function getImageUrl(id) {
    return collections.get(`/${id}`).then(result => {
        if (result.status === 200) {
            let search = `og:image" content="`
            let start = result.data.indexOf(search)
            let end = result.data.indexOf(`"`, start + search.length)
            let url = result.data.slice(start + search.length, end)

            if (url === "/emoji/frame-with-picture.png") {
                console.log('no image found, retrying...')
                return getImageUrl(Math.floor(Math.random() * MAX_COUNT))
            }

            return url
        }
    }).catch(err => {
        console.log(err)
    })
}
 
app.get('/img/:id', function (req, res, next) {
    getImageUrl(req.params.id).then(url => {
        res.json({data: url})
    }).catch(err => {
        console.log(err)
        res.json({data: ''})
    })
})

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

function generateMap() {
    let neutral = Array.from({length: 7}, _ => "neutral")
    let red = Array.from({length: 9}, _ => "red")
    let blue = Array.from({length: 8}, _ => "blue")
    let sin = ["assasin"]

    let hk = shuffle(neutral.concat(red, blue, sin))
    return hk.map(x => {
        return x + (Math.round(Math.random()) === 1 ? " f" : " m")
    })
}

app.get('/game', function (req, res, next) {
    res.send(generateMap())
})
 
app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})