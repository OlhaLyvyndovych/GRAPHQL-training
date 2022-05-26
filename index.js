const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/typeDefs_w');
const resolvers = require('./src/resolvers_w');
const server = new ApolloServer({ typeDefs, resolvers });
const mongoose = require('mongoose');
const { mainModule } = require('process');


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/Api_practice');
}


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

  