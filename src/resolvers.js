const { Blogger, Author, Book } = require('./models/Authors');

const resolvers = {
    Writer: {
        __resolveType(writer, context, info) {
            if(writer.quote) {
                return 'Author';
            }

            if(writer.blog) {
                return 'Blogger';
            }
            return null;
        }
    },

    Author: {
        async name (parent) {
            return await parent.name;
        }
    },

    Book: {
        async title() { 
            return await Book.find();
        }
    },

    Query: {
        async getAllAuthors () {
            return await Author.find();
        },
        async getAllBloggers () {
            return await Blogger.find();
        },
        async getAuthorById (parent, { id }, context, info) {
            return await Author.findById(id);
        },
        async getBloggerById (parent, { id }, context, info) {
            return await Blogger.findById(id);
        },
        async getSorted() {
            return await Author.find().sort({ author: { name: 1 }});
        },
        
        async getAllWriters() {
            const quoteWriters = Author.find({}).exec();
            const blogWriters = Blogger.find({}).exec();

            const [quotes, blogs] = await Promise.all([quoteWriters, blogWriters]);
            return [...quotes, ...blogs];
        },

        async getBooks() {
            return await Book.find();
        },

        async getBookByAuthor(_, args, context, info) {
            const { name } = args;
            const books = Book.find();
            return (await books).filter( (book) => book.author == author);
        }
     },

    Mutation: {
        async addAuthor (parent, args, context, info) {
            const {name, quote: {about, text}, book: title} = args.author;
            const author = new Author({ name, quote: {about, text}, book: title });
            await author.save();
            return author;
        },

        async addBlogger (parent, args, context, info) {
            const { name, blog: {title, content}} = args.blogger;
            const blogger = new Blogger({ name, blog: {title, content}});
            await blogger.save();
            return blogger;
        },

        async updateQuote (parent, args, context, info) {
            const { id } = args;
            const { quote: { about, text } } = args.blog;
            const updates = {};
            if (quote.about !== undefined) {
                updates.quote.about = quote.about;
            }
            if (quote.text !== undefined) {
                updates.quote.text = quote.text;
            }
            
          const quote = await Author.quote.findByIdAndUpdate(id, { updates }, { new: true });
          return quote;
        },

        async deleteAuthor(parent, args, context, info) {
            const { id } = args;
            await Author.findByIdAndDelete(id);
            return "The author has been deleted .."

        }
    }
};

module.exports = resolvers