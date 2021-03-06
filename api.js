const MAX_COUNT = 5125;
const CancelToken = axios.CancelToken;
let cancels = [];

let aj = axios.create({
  baseURL: 'https://api.mplus.org.hk/graphql',
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
    Authorization: localStorage.getItem('API')
  }
});

let collections = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://collections.mplus.org.hk/en/objects'
});

function getRandomImages(category = 'Photography', count = 25, seed = false) {
  let categoryOpt = category !== 'all' ? `category: "${category}"` : '';
  let shuffleSeed = seed ? `shuffleSeed: "${seed}",` : '';
  // shuffleSeed
  // filter by constituents
  const payload = {
    query: `{
            objects (per_page: ${count}, shuffle: true, ${shuffleSeed} ${categoryOpt}) {
              id
              objectNumber
              title
              displayDate
              medium
              classification {
                area
                category
              }
              _sys {
                pagination {
                  page
                  perPage
                  total
                  maxPage
                }
              }
            }
        }`
  };

  return aj.post('/', payload).then(result => {
    if (result.status === 200) {
      let images = result.data.data.objects;

      return images.map(imgData => {
        return {
          id: imgData.id,
          alt: imgData.title
        };
      });
    }
  });
}

function getImageUrl(id) {
  return collections
    .get(`/${id}`, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancels.push(c);
      })
    })
    .then(result => {
      if (result.status === 200) {
        let search = `og:image" content="`;
        let start = result.data.indexOf(search);
        let end = result.data.indexOf(`"`, start + search.length);
        let url = result.data.slice(start + search.length, end);

        if (url === '/emoji/frame-with-picture.png') {
          console.log('no image found, retrying...');
          return getImageUrl(Math.floor(random() * MAX_COUNT));
        }

        return url;
      }
    })
    .catch(err => {
      if (axios.isCancel(err)) {
        console.log('getImageUrl canceled');
      } else {
        console.log(err);
      }
    });
}

function getCategories() {
  const payload = {
    query: `{
            categories(sort_field: "count") {
                title
                count
              }
        }`
  };

  return aj.post('/', payload).then(res => {
    if (res.status === 200) {
      let categories = res.data.data.categories;

      return categories
        .filter(category => category.count >= 200)
        .filter(category => category.title !== 'Video')
        .map(category => category.title);
    }
  });
}

getCategories().then(cats => {
  let catList = document.getElementById('categories-list');
  cats.forEach(cat => {
    let el = document.createElement('option');
    el.setAttribute('value', cat);
    el.innerHTML = cat;
    catList.appendChild(el);
  });
});
