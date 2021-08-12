import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import { getUser, protectResolver } from "./users/users.utils";
import { typeDefs, resolvers } from "./schema";

require("dotenv").config();

const { PORT } = process.env;
const app = express();
const startServer = async () => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    playground: true,
    introspection: true,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectResolver,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  server.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));

  await new Promise((r) => app.listen({ port: PORT }, r)).then(() =>
    console.log(
      `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`
    )
  );
};

startServer();
