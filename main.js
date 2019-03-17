var express = require('express');
var axios = require('axios');
var cors = require('cors');
var app = express();

const MAX_COUNT = 5125;

let collections = axios.create({
  baseURL: 'https://collections.mplus.org.hk/en/objects',
  responseType: 'document'
});

app.use(cors());

function getImageUrl(id) {
  return collections
    .get(`/${id}`)
    .then(result => {
      if (result.status === 200) {
        let search = `og:image" content="`;
        let start = result.data.indexOf(search);
        let end = result.data.indexOf(`"`, start + search.length);
        let url = result.data.slice(start + search.length, end);

        if (url === '/emoji/frame-with-picture.png') {
          console.log('no image found, retrying...');
          return getImageUrl(Math.floor(Math.random() * MAX_COUNT));
        }

        return url;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

app.get('/img/:id', function(req, res, next) {
  getImageUrl(req.params.id)
    .then(url => {
      res.json({ data: url });
    })
    .catch(err => {
      console.log(err);
      res.json({ data: '' });
    });
});

app.listen(3000, function() {
  console.log('CORS-enabled web server listening on port 3000');
});
