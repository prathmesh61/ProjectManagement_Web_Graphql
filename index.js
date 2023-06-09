const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const schema = require("./graphQLSchema");

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
});

startStandaloneServer(server, {
  listen: { port: 9000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
