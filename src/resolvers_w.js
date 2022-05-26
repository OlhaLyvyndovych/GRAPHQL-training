const { isObjectIdOrHexString } = require('mongoose');
const { Writer } = require('./models/Writer');

const resolvers = {
    Writer: {
        __resolveType(writer, context, info) {
            if(writer.author) {
                return 'Author';
            }

            if(writer.blogger) {
                return 'Blogger';
            }
            return null;
        }

    },

    Query: {
        async author () {
            const query = { quote: {$exists: true} }
            return await Writer.find(query);    
        },

        async blogger () {
            const query = { blog: {$exists: true}};
            return await Writer.find(query); 
        },

        async sort () {
            const query = { name: 1 }
            return await Writer.find().sort(query); 
        }
    },
    Mutation: {
        async createAuthor (parent, args, context, info) {
            const { name, quote:{about, text}, book: title} = args.author;
            const author = new Writer({ name, quote:{ about, text}, book: title});
            await author.save();
            return author;
        },

        async createBlogger (parent, args, context, info) {
            const { name, blog:{title, content}} = args.blogger;
            const blogger = new Writer({ name, blog:{ title, content}});
            await blogger.save();
            return blogger;
        },

        async deleteAuthor (parent, { id }, context, info) {
            Writer.findByIdAndDelete(id);
            return await ` Author with id: ${id} is deleted..`
        },

        async updateBlogger (parent, args, context, info) {
            const query = { blog: {$exists: true}};
            const bloggers = Writer.find(query); 
            const { id } = args;
            const { name, blog: {title, content}} = args.blogger;
            const updates = {};
            if (blogger.name !== undefined) {
                updates.blogger.name = blogger.name;
            }

            if (blogger.blog.title !== undefined) {
                updates.blogger.blog.title = blogger.blog.title;
            }

            if (blogger.blog.text !== undefined) {
                updates.blogger.blog.text = blogger.blog.text;
            }

            const blogger = await bloggers.findByIdAndUpdate(id, { updates }, { new: true });
            return blogger; 
        }
    }
}

module.exports = resolvers