// pull in the express module and create your app

const express = require('express')
const app = express()

var bodyParser = require('body-parser')

// add a route for the root path 
app.get('/', function rootRoute(req, res) {
    res.send('Book service home page!');
});


// ... other code... like creating your application.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/book', require('./routes/book.js'));

app.use(express.static('public'));

// Start the server
app.listen(3131, function () {
  console.log('Book app listening on port 3131!')
})
