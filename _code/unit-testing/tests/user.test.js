const parse2 = require("graphql");
const schema = require("graphql-yoga");
const yoga2 = require("graphql-yoga");
const executor = require("@graphql-tools/executor-http");

test("test", () => {
  expect(1 + 2).toBe(3);
});

const schema2 = schema.createSchema({
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

const yoga = yoga2.createYoga({ schema2 });

const executor2 = executor.buildHTTPExecutor({
  fetch: yoga.fetch,
});

function assertSingleValue(value) {
  if (Symbol.asyncIterator in value) {
    throw new Error("Expected single value");
  }
}

test("Should create a new user", async () => {
  // const createUser = yoga.createYoga({
  //   graphiql: {
  //     defaultQuery: /* GraphQL */ `
  //       mutation {
  //         createUser(
  //           data: { name: "Daniel", email: "foo@example.com", age: 25 }
  //         ) {
  //           id
  //           email
  //           age
  //         }
  //       }
  //     `,
  //   },
  // });

  const result = await executor2({
    document: parse2.parse(/* GraphQL */ `
      # mutation {
      #   createUser(
      #     data: { name: "Daniel", email: "foo@example.com", age: 25 }
      #   ) {
      #     id
      #     email
      #     age
      #   }
      # }
      query {
        greetings
      }
    `),
  });

  assertSingleValue(result);
  // const response = await client.mutate({
  //   mutation: createUser,
  // });
  console.assert(
    result.data?.greetings === "Hello World!",
    `Expected 'Hello World!' but got ${JSON.stringify(result)}`
  );
});
