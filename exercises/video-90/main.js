const express = require('express')
const app = express()
const fs = require('fs')
const blog = require('./routes/blog')
const port  = 3000

// inbuilt middleware (express)
app.use(express.static('public'))

// routers middleware
app.use('/blog', blog)

// application-level middleware   /   custome middleware 1
app.use((req, res, next) => {
    req.stark = 'Hi!, I am Stark'
    fs.appendFileSync('log.txt', `A ${req.method} request was made at timestamp ${Date.now()}\n`)    // logging info
    console.log('M1')
    next()
})

// custome middleware 2
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
