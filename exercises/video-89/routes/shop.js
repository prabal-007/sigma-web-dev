const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Welcome to Shop')
})

router.get('/about', (req, res) => {
    res.send('About Shop')
})

module.exports = router