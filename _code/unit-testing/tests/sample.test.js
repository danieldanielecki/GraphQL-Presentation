const graphql = require("graphql");
const yogga = require("graphql-yoga");
const executorHttp = require("@graphql-tools/executor-http");

const schema = yogga.createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greetings: String!
    }
  `,
  resolvers: {
    Query: {
      greetings: () => "Hello World!",
    },
  },
});

const yoga = yogga.createYoga({ schema });

function assertSingleValue(value) {
  if (Symbol.asyncIterator in value) {
    throw new Error("Expected single value");
  }
}

const executor = executorHttp.buildHTTPExecutor({
  fetch: yoga.fetch,
});

it("runs a query", async () => {
  const result = await executor({
    document: graphql.parse(/* GraphQL */ `
      query {
        greetings
      }
    `),
  });

  assertSingleValue(result);
  console.log(JSON.stringify(result));

  console.assert(
    result.data?.greetings === "Hello World!",
    `Expected 'Hello World!' but got ${result.data.greetings}`
  );
});
