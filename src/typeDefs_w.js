const { gql } = require('apollo-server');

const typeDefs = gql`

    interface Writer {
        name: String
    }

    type Author implements Writer {
        id: ID
        name: String
        quote: Quote
        book: Book
    }

    input AuthorInput {
        name: String
        quote: QuoteInput
        book: BookInput
    }

    type Quote {
        about: String
        text: String
    }

    input QuoteInput {
        about: String
        text: String
    }

    type Book {
        title: String
    }

    input BookInput {
        title: String
    }

    type Blogger implements Writer {
        name: String
        blog: Blog
    }

    input BloggerInput {
        name: String
        blog: BlogInput
    }

    type Blog {
        title: String
        content: String
    }

    input BlogInput {
        title: String
        content: String
    }

    type Query {
        author: [Author!]!
        blogger:[Blogger!]!
        sort: [Author]
        

    }

    type Mutation {
        createAuthor(author: AuthorInput): Author
        createBlogger(blogger: BloggerInput): Blogger
        deleteAuthor(id:ID): String
        updateBlogger(id:ID): Blogger! 
    }
`

module.exports = typeDefs;