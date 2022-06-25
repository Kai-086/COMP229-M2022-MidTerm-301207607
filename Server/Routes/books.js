/*
    File Name:    books.js
    Student Name: Kai-Pang Hung
    Student ID:   301207607
    Web App name: My Favourite Books
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get("/", (req, res, next) => {
    books_1.default.find((err, books) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render("books/index", {
                title: "Books",
                page: "books",
                books: books,
            });
        }
    });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
    res.render("books/details", {
        title: "Add Books",
        page: "details",
        books: "",
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
    let newBook = new books_1.default({
        Title: req.body.title,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre,
    });
    books_1.default.create(newBook, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/books");
    });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    books_1.default.findById(id, function (err, book) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render("books/details", {
            title: "Edit Book Information",
            page: "details",
            books: book,
        });
    });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
    let id = req.params.id;
    let editedBook = new books_1.default({
        _id: id,
        Title: req.body.title,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre,
    });
    books_1.default.updateOne({ _id: id }, editedBook, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/books");
    });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    books_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect("/books");
    });
});
//# sourceMappingURL=books.js.map