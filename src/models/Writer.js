const mongoose = require('mongoose');

const WriterSchema = mongoose.Schema({
    name: String,
    quote: {
        about: String,
        text: String
    },
    book: {
        title: String
    },
    blog: {
        title: String,
        content: String
    }
});




const Writer = mongoose.model('Writer', WriterSchema);

module.exports = { Writer }

