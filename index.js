const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./lib/resolvers');

const port = process.env.PORT || 3000;
const app = express();

// Defining schema
const pathToSchema = join(__dirname, 'lib', 'schema.graphql');
const typeDefs = readFileSync(pathToSchema, 'utf-8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Config of express-graphql
app.use(
  '/api',
  graphqlHTTP({
    schema,
    graphiql: false,
    rootValue: resolvers,
  }),
);

// Settings of graphql playground
app.get('/playground', expressPlayground({ endpoint: '/api' }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening in http://localhost:${port}/playground`);
});
