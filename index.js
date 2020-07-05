const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;

const port = process.env.PORT || 3000;
const app = express();

// Defining schema
const schema = buildSchema(`
    type Query {
        hello: String
        goodbye: String
    }
`);

// Setting resolvers
const resolvers = {
  hello() {
    return 'Hello world!';
  },
  goodbye() {
    return 'Goodbye cruel world!';
  },
};

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
