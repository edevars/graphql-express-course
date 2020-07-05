const { graphql, buildSchema } = require("graphql");

// Defining schema
const schema = buildSchema(`
    type Query {
        hello: String
        goodbye: String
    }
`);

// Setting resolvers
const resolvers = {
    hello: function(){
        return "Hello world!"
    },
    goodbye: function(){
        return "Goodbye cruel world!"
    }
}

// Executing schema
graphql(schema,"{goodbye}", resolvers).then((data) => {
  console.log(data);
});
