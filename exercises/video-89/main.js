const express = require('express')
const app = express()
const blog = require('./routes/blog')
const shop = require('./routes/shop')
const port = 3000

app.use(express.static('public'))
app.use('/blog', blog)
app.use('/shop', shop)

app.get('/', (req, res) => {
    console.log('Hi its GET!')
    res.send("Hello GET")
})

app.post('/', (req, res) => {
    res.send('Hello POST')
    console.log('Hay From POST')
})

app.put('/', (req, res) => {
    res.send('Hello PUT')
    console.log('Hay From PUT')
}).delete('/', (req, res) => {          // this is called chaining
    res.send('Hello DELETE')
    console.log('Hay From DELETE')
})

// serving HTML files
app.get('/index', (req, res) => {
    res.sendFile('templates/index.html', { root: __dirname })
})

// serveing json data
app.get('/api', (req, res) => {
    res.json({a : 1, b : 2, c : 3, d : 4})
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})