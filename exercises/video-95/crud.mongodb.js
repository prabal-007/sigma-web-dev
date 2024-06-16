// ------------ CRUD Operation in MongoDB ---------------
use("crudDB")

// CREATE
db.createCollection('courses')

// Create ('C')

// to insert one object in DB
// db.courses.insertOne({
//     Book: "Let us C",
//     Author: "Stark",
//     Price: 500,
//     Publisher: "Pearson Education"
// })

//to insert multiple objects in DB
// db.courses.insertMany([
//     {
//         "Book": "Let us C",
//         "Author": "Stark",
//         "Price": 500,
//         "Publisher": "Pearson Education"
//     },
//     {
//         "Book": "Python Programming",
//         "Author": "Smith",
//         "Price": 600,
//         "Publisher": "O'Reilly Media"
//     },
//     {
//         "Book": "JavaScript Essentials",
//         "Author": "Johnson",
//         "Price": 500,
//         "Publisher": "Manning Publications"
//     },
//     {
//         "Book": "C++ Primer",
//         "Author": "Williams",
//         "Price": 700,
//         "Publisher": "Addison-Wesley"
//     },
//     {
//         "Book": "The Ruby Way",
//         "Author": "Brown",
//         "Price": 500,
//         "Publisher": "Prentice Hall"
//     },
//     {
//         "Book": "Mastering Swift",
//         "Author": "Jones",
//         "Price": 750,
//         "Publisher": "Packt Publishing"
//     },
//     {
//         "Book": "Kotlin in Action",
//         "Author": "Garcia",
//         "Price": 620,
//         "Publisher": "Manning Publications"
//     },
//     {
//         "Book": "PHP for Beginners",
//         "Author": "Martinez",
//         "Price": 480,
//         "Publisher": "No Starch Press"
//     },
//     {
//         "Book": "Go Programming",
//         "Author": "Rodriguez",
//         "Price": 500,
//         "Publisher": "O'Reilly Media"
//     },
//     {
//         "Book": "R for Data Science",
//         "Author": "Davis",
//         "Price": 700,
//         "Publisher": "Wiley"
//     }
// ]
// )


// READ ('R')

// Read multiple object
// let a = db.courses.find({Price: 500})
// let a = db.courses.find({Price: { $gt: 600}})
// console.log(a)

// Read single data (gets first occurence)
// let b = db.courses.findOne({Price: 600})
// console.log(b)



// UPDATE ('U')
// db.courses.updateOne({Price: 500}, {$set: {Price: 499}})
// db.courses.updateMany({Price: 500}, {$set: {Price: 499}})


// Delete
// db.courses.deleteOne({Price: 499})
db.courses.deleteMany({Price: 499})
let a = db.courses.find({Price: 499})
console.log(a)