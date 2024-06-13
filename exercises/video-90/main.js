const express = require('express')
const app = express()
const fs = require('fs')
const blog = require('./routes/blog')
const port  = 3000

app.use(express.static('public'))
app.use('/blog', blog)

app.use((req, res, next) => {
    req.stark = 'Hi!, I am Stark'
    fs.appendFileSync('log.txt', `A ${req.method} request was made at timestamp ${Date.now()}\n`)
    console.log('M1')
    next()
})

app.use((req, res, next) => {
    console.log('M2')
    next()
})



app.get('/', (req, res) => {
    res.send('Hello There !')
})

app.get('/about', (req, res) => {
    res.send(req.stark)
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})