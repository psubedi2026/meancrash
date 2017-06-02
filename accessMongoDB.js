var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/MyNewDB';
//var uri = process.env.MY_APP_DB_URI;
// this will be something like 'mongodb://username:password@localhost:12345/MyNewDB'
// but since we don't want our database password stored OPENLY on github, we'll put it in an
// environment variable which I called "MY_APP_DB_URI" above - don't forget to create that!

mongodb.MongoClient.connect(uri, function connectionMade(err, db) {
  if(err) {
    // if there was an error, we need to handle that!!
    throw err; // for now, we're just rethrowing it
  }

  //Creating some records
  db.collection('books')
    .insert({
      title: 'War and Peace',
      ISBN: '9785040000531',
      author: {
        name: 'Tolstoy',
        dob: '1828-09-09'
      }
    }, function insertSuccessHandler(err, result) {
      if (err) { /* handle this error! */ throw err; }


      console.log(  'Newly inserted book: ' + result );  
      // it will have an auto-assigned "id" that looks like: "507f1f77bcf86cd799439011"
    });

    db.collection('books')
      .insert({
        title: 'Deletable book',
        ISBN: '9785040002342',
        author: {
          name: 'Cher',
          dob: '1928-09-09'
        }
      }, function insertSuccessHandler(err, result) {
        if (err) { /* handle this error! */ throw err; }

        console.log( result );  // this will be the newly created book!
        // it will have an auto-assigned "id" that looks like: "507f1f77bcf86cd799439011"
      });


  // Now we're ready to make a query!
  db.collection('books')
    .find({ title: /War/ })
    .toArray(function booksRetrieved(err, books) {
      if (err) { /* handle this one too! */ throw err; }

      books.forEach(function printBook(book) {
        console.log( book.title );
      });

      // when we're done with the database connection we should close it!
      db.close(function(err) {
        // do any work you need to AFTER the connection has closed
        // the "err" object will be null if there was no error
      });
    });


   //updating a record
    db.collection('books')
      .update(
        { id: '59305f7eeb452013876de500' },   //update id
        { $set: { author: { name: 'Leo Tolstoy' } } },
        function (err, result) {
          if (err) { /* handle this error! */ throw err; }
          console.log( result );
        }
      );


   //deleting a record

  /*   db.collection('books')
        .deleteMany({ title: 'Deletable book' }, function(err, result) {
         if (err) {  throw err; }
         console.log( 'Number of deletions: ' + result.deletedCount );
       });
  */


});
