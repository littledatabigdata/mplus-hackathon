let aj = axios.create({
  baseURL: 'https://api.mplus.org.hk/graphql',
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
    Authorization: 'bearer f6081d411087c7d6e14071193a20052e'
  }
});

function getRandomImages(
  category = 'Photography',
  count = 25,
  seed = false,
  mock = false
) {
  if (mock === true) {
    const arr = [
      { id: 1, alt: 'Architecture of Density, No.39' },
      { id: 2, alt: 'Artistic Chicken' },
      { id: 3, alt: 'Lanwei 07 / Two Generations 02 / Guangzhou' },
      { id: 4, alt: 'Junk Boat' },
      { id: 5, alt: 'Untitled' },
      { id: 6, alt: 'Pouring Bottled Water into the Victoria Harbour' },
      {
        id: 7,
        alt: 'Model, Hebei Education Publishing House (2000–2004), Hebei, China'
      },
      { id: 8, alt: 'Sun and Peaks' },
      { id: 9, alt: 'River of Light' },
      { id: 10, alt: 'Calendars 2020-2096' },
      { id: 11, alt: 'Conversations I' },
      { id: 12, alt: 'Kowloon Walled City—Caged Balconies' },
      {
        id: 13,
        alt: 'Da Hen Li cycle — Standard Measurement for Tennis Court'
      },
      { id: 14, alt: 'Electroprobe Installation #2—Magnetic Guangzhou' },
      { id: 15, alt: 'Landscape No.0880' },
      { id: 16, alt: 'New York, New York, 1979' },
      { id: 17, alt: 'Hong Kong at Night' },
      { id: 18, alt: "Down the Rabbit Hole, 'Taxi!' Says Alice" },
      { id: 19, alt: 'Portraits of Cantonese Opera—Chan Hung-chun' },
      { id: 20, alt: 'One Year Performance 1978–1979' },
      { id: 21, alt: 'No Basic Rules' },
      { id: 22, alt: 'Sitting on the Wall—Guangzhou (II)' },
      { id: 23, alt: 'Recycling Cinema' },
      { id: 24, alt: 'Bauhaus' },
      { id: 25, alt: 'I Shall Come Forth As Gold' }
    ];
    return Promise.resolve(arr);
  }

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
