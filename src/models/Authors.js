const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String
});

const BloggerSchema = mongoose.Schema({
    name: String,
    blog: {
        title: String,
        content: String
    }
});

const AuthorSchema = mongoose.Schema({
    name: String,
    quote: {
        about: String,
        text: String
    },
    book: BookSchema
});

//const Writer = mongoose.model('Writer', WriterSchema);
const Blogger = mongoose.model('Blogger', BloggerSchema);
const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);

module.exports = { Blogger, Author, Book };
