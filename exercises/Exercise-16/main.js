import express from 'express'
import mongoose from 'mongoose'
import Employee from './models/employee.js'


mongoose.connect('mongodb://localhost:27017/company');
const app = express()
const port = 3000

app.set('view engine', 'ejs')

const getRandom = (arr) => {
    let rno = Math.floor(Math.random() * (arr.length - 1))
    return rno
}

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/generate', async (req, res) => {
    // res.render('index')
    await Employee.deleteMany({})
    let randomName = ['Stark', 'Tony', 'Prabal']
    let randomCities = ['New Delhi', 'Toronto', 'Rome']
    let randomLan = ['Python', 'C++', 'Javascript', 'Java']
    for (let i = 0; i < 10; i++) {
        let salary = Math.floor(Math.random() * 100000);
        let e = await Employee.create({
            name: randomName[getRandom(randomName)],
            salary: salary,
            language: randomLan[getRandom(randomLan)],
            city: randomCities[getRandom(randomCities)],
            isManager: salary > 90000
        })
        console.log(e)
    }
    res.render('index')
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})