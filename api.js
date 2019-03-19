let aj = axios.create({
  baseURL: 'https://api.mplus.org.hk/graphql',
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
    Authorization: localStorage.getItem('API')
  }
});

function getRandomImages(
  category = 'Photography',
  count = 25,
  seed = false
) {
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

function getImageUrl(id, mock) {
  if (mock === true) {
    return Promise.resolve(`./images/demo/${id}.jpg`);
  }

  return axios.get(`http://localhost:3000/img/${id}`).then(result => {
    if (result.status === 200) {
      return result.data.data;
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
