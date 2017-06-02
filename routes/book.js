// In /routes/book.js
var express = require('express');
var router = express.Router();

router.get('/', function getAllUsers(req, res) {
  // this will be interpreted as the URL: /book/
  res.send('main book page');
});

router.post('/', function createUser(req, res) {
  // do the book creation here!
  res.send('The new book');
});

router.get('/:id', function singleUser(req, res) {
  // get a single book
  res.send('single book page');
});

// Export the "book" routes
module.exports = router;