const express = require('express')
const router = express.Router()
const fs = require('fs')

router.use((req, res, next) => {
    console.log('M3')
    fs.appendFileSync('log.txt', `Logged in blog at ${Date.now()}\n`)
    next()
})


router.get('/', (req, res) => {
    res.send('Blog Homepage')
})

router.get('/about', (req, res) => {
    res.send('Know about Blog')
})

module.exports = router