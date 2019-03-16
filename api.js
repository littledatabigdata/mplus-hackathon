let aj = axios.create({
    baseURL: 'https://api.mplus.org.hk/graphql',
    timeout: 1000,
    headers: {
        'content-type': 'application/json',
        Authorization: 'bearer f6081d411087c7d6e14071193a20052e'
    }
})

const random_payload = {
    query: `{
        objects (per_page: 25, shuffle: true){
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

aj.post('/', random_payload)
  .then(res => {
      console.log(res)
  }).catch(err => {
      console.log(err)
  })