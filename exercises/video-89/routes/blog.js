const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('This is Blog Homepage')
})

router.get('/about', (req, res) => {
    res.send('This is Blog About page')
})

router.get('/post/:slug', (req, res) => {
    res.send(`This is blog about ${req.params.slug}`)
})

module.exports = router