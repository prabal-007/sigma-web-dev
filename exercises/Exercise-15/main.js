// Exercise 15 - Clear the Clutter

const fs = require('fs')
const path = require('path')
const dir = __dirname

const files = fs.readdirSync(dir)


files.forEach(file => {
    // console.log(path.extname(file))
    if(path.extname(file) !== '.js' && path.extname(file) !== 'undefined'){
        console.log('here')
    }
    if(path.extname(file) !== '.js' && path.extname(file) !== 'undefined'){
        // console.log(path.extname(file))
        let x = path.extname(file).split(".")[1]
        console.log(x)
        fs.mkdirSync(x)
    }

});