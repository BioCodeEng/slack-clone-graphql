import  express from 'express'
import { ApolloServer, gql }  from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line',
      'editor.fontSize': 14
    },
  }
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`),
);
