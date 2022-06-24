/*
    File Name:    books.ts
    Student Name: Kai-Pang Hung
    Student ID:   301207607
    Web App name: My Favourite Books
*/

// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    res.render('books/details', {title: 'AddBooks', page: 'details', books: ''});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    let newBook = new book({
      Title: req.body.title,
      // No Description in details page
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    });
    // Test uses
    //console.log(req.body.title + ' ' + req.body.price + ' ' + req.body.author + ' ' + req.body.genre);

    book.create(newBook, function(err: CallbackError) {
      if(err) {
        console.error(err);
        res.end(err);
      }
      // If process success, then go back to Book List page
      res.redirect('/books');
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


//module.exports = router;
