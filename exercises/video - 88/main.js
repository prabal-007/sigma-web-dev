const express = require('express')
const app = express()
const port = 3000

// middleware
app.use(express.static('public'))

// app.get, post, put, delete(path, handler) 
app.get('/', (req, res) => {
    res.send('Hello World with Express!')
})

app.get('/about', (req, res) => {
    res.send('About Us!')
})

app.get('/blog/:slug/:two', (req, res) => {
     // logic to fetch slug from DB
    //  for URL - http://127.0.0.1:3000/blog/learn-python/dsa?region=in&theme=black
    // whatever comes after '?' in url is querry and befor that is params
    res.send(`Blog about ${req.params.slug}`)

    console.log(req.params)  //   { slug: 'learn-python', two: 'dsa' }
    console.log(req.query)  //    { region: 'in', theme: 'black' }
})

app.get('/contact', (req, res) => {
    res.send('Contact us!')
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
