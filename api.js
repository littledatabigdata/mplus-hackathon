let aj = axios.create({
    baseURL: 'https://api.mplus.org.hk/graphql',
    timeout: 1000,
    headers: {
        'content-type': 'application/json',
        Authorization: 'bearer f6081d411087c7d6e14071193a20052e'
      },
})

const payload = {
    query: `{
      hello
    }`
  }

aj.post('/', payload)
  .then(res => {
      console.log(res)
  }).error(err => {
      console.log(err)
  })