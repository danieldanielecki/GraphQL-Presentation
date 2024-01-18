const graphql = require("graphql");
const graphqlYoga = require("graphql-yoga");
const executorHttp = require("@graphql-tools/executor-http");
const Query = require("./../resolvers/Query.js");
const Mutation = require("./../resolvers/Mutation.js");
const Subscription = require("./../resolvers/Subscription.js");
const User = require("./../resolvers/User.js");
const Post = require("./../resolvers/Post.js");
const fs = require("fs");
const path = require("path");

const yoga = graphqlYoga.createYoga({
  schema: graphqlYoga.createSchema({
    typeDefs: fs.readFileSync(
      path.join(__dirname, "..", "./", "src", "schema.graphql"),
      "utf8"
    ),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      User,
      Post,
    },
  }),
});

const executor = executorHttp.buildHTTPExecutor({
  fetch: yoga.fetch,
});

it("should run a dummy query", async () => {
  const result = await executor({
    document: graphql.parse(/* GraphQL */ `
      query {
        dummy {
          id
          name
          email
        }
      }
    `),
  });

  console.log(JSON.stringify(result));

  // toEqual/toStrictEqual fixes toBe's: "Received: serializes to the same string" (https://stackoverflow.com/questions/56839801/jest-js-error-received-serializes-to-the-same-string)
  expect(result.data?.dummy).toEqual({
    id: "1234",
    name: "Test",
    email: "foo@google.com",
  });
});
