let aj = axios.create({
    baseURL: 'https://api.mplus.org.hk/graphql',
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        Authorization: 'bearer f6081d411087c7d6e14071193a20052e'
    }
})

let collections = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://collections.mplus.org.hk/en/objects',
    responseType: 'document'
})

function getRandomImages(count=25) {
    const payload = {
        query: `{
            objects (per_page: ${count}, shuffle: true, category: "Photography") {
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
    }
  
    return aj.post('/', payload).then(result => {
        if (result.status === 200) {
            let images = result.data.data.objects
  
            return images.map(imgData => imgData.id)
        }
    })
  }
  
  function getImageUrl(id) {
    return collections.get(`/${id}`).then(result => {
        if (result.status === 200) {
            let document = result.data
            return document.head.querySelector('meta[property="og:image"]').content
        }
    })
  }