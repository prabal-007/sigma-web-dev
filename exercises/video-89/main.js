const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('hello GET')
}).post('/', (req, res) => {
    res.send('Hello POST')
    console.log('Hay From POST')
}).put('/', (req, res) => {
    res.send('Hello PUT')
    console.log('Hay From PUT')
}).delete('/', (req, res) => {
    res.send('Hello DELETE')
    console.log('Hay From DELETE')
})

// serving HTML files
app.get('/main', (req, res) => {
    res.sendfile('templates/main.html', __dirname)
})


// serveing json data
app.get('/api', (req, res) => {
    res.json({a : 1, b : 2, c : 3, d : 4})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})