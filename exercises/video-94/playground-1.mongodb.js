/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('SigmaCoursesDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
[
  {
    "name": "Java",
    "Instructor": "Stark",
    "Price": 1000
  },
  {
    "name": "Python",
    "Instructor": "Smith",
    "Price": 1200
  },
  {
    "name": "JavaScript",
    "Instructor": "Johnson",
    "Price": 1100
  },
  {
    "name": "C++",
    "Instructor": "Williams",
    "Price": 900
  },
  {
    "name": "Ruby",
    "Instructor": "Brown",
    "Price": 950
  },
  {
    "name": "Swift",
    "Instructor": "Jones",
    "Price": 1300
  },
  {
    "name": "Kotlin",
    "Instructor": "Garcia",
    "Price": 1150
  },
  {
    "name": "PHP",
    "Instructor": "Martinez",
    "Price": 800
  },
  {
    "name": "Go",
    "Instructor": "Rodriguez",
    "Price": 1400
  },
  {
    "name": "R",
    "Instructor": "Davis",
    "Price": 1050
  }
]
]);

// Print a message to the output window.
console.log(`Course Data Inserted`);
