const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    let siteName = 'Blablox'
    let siteTitle = 'Ejs Demo'
    let arr = ['One', 'Two', 333, 'Stark']
    res.render("index", {siteName: siteName, searchBox: 'Search here...', arr, siteTitle})
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})