const { gql } = require('apollo-server');

const typeDefs = gql`
    interface Writer {
        id: ID
        name: String
    }

    type Author implements Writer {
        id: ID
        name: String
        quote: Quote
        book: Book
    }

    input AuthorInput {
        name: String!
        quote: QuoteInput!
        book: BookInput!
    }

    type Quote {
        id: ID
        about: String
        text: String
    }

    input QuoteInput {
        about: String
        text: String
    }

    type Blogger implements Writer {
        id: ID
        name: String!
        blog: Blog!
    }

    input BloggerInput {
        name: String!
        blog: BlogInput!
    }

    type Blog {
        title: String
        content: String
    }

    input BlogInput {
        title: String!
        content: String!
    }

    type Book {
        id: ID
        title: String
    }

    input BookInput {
        title: String!
    }

    type Query {
        getAuthorById(id: ID): Author
        getBloggerById(id: ID): Blogger
        getSorted: [Author]
        getBookByAuthor(author: AuthorInput): [Book]
        getAllAuthors: [Author]
        getAllBloggers: [Blogger]
        getAllWriters: [Writer!]!
        getBooks: [Book!]!
    }

    type Mutation {
        addAuthor(author: AuthorInput): Author
        addBlogger(blogger: BloggerInput): Blogger
        updateQuote(id:ID, quote: QuoteInput): Quote
        deleteAuthor(id: ID): String
    }
`

module.exports = typeDefs;