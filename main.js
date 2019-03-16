var express = require('express')
var axios = require('axios')
var cors = require('cors')
var app = express()

let collections = axios.create({
    baseURL: 'https://collections.mplus.org.hk/en/objects',
    responseType: 'document'
})
 
app.use(cors())
 
app.get('/img/:id', function (req, res, next) {
    collections.get(`/${req.params.id}`).then(result => {
        if (result.status === 200) {
            let search = `og:image" content="`
            let start = result.data.indexOf(search)
            let end = result.data.indexOf(`"`, start + search.length)
            let url = result.data.slice(start + search.length, end)

            res.json({data: url})
            // let document = result.data
            // let url = document.head.querySelector('meta[property="og:image"]').content
            // res.json({data: url})
        }
    }).catch(err => {
        console.log(err)
    })
})
 
app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})