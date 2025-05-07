import { ApolloServer, gql } from 'apollo-server';
import dotenv from 'dotenv';

dotenv.config();

// Schéma de base
const typeDefs = gql`
  type Query {
    ping: String!
  }
`;

// Résolveurs de base
const resolvers = {
  Query: {
    ping: () => 'pong 🥘',
  },
};

// Serveur Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Lancement
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 API Dishly lancée sur ${url}`);
});
