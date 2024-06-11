import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


import typeDefs from "./schemas";
import resolvers from "./resolvers";

// Creating a new server~
const server = new ApolloServer({ typeDefs, resolvers });

// > IIFE (https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
(async () => {
    console.log("Launching Apollo Server...");

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4005 }
    });
    
    console.log(`Server ready at: ${url} `)
})()