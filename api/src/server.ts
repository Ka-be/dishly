import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Salut Dishly Master 👋',
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
      require('apollo-server-core').ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app: app as any });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server Dishly OK sur http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
