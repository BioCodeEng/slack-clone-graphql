import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  formatError: (error) => {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return error;
  },

  context: {
    models,
    user: {
      id: 1,
    },
  },
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line',
      'editor.fontSize': 14,
    },
  },
});

const app = express();
server.applyMiddleware({ app });

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

models.sequelize.sync({ force: false }).then(() => {
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
