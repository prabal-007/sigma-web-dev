import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"


const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/', (req, res) => {
    // res.send('hello')
    console.log(req.body)
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})