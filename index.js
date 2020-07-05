const { graphql, buildSchema } = require("graphql");

// Defining schema
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Executing schema
graphql(schema, "{hello}").then((data) => {
  console.log(data);
});
