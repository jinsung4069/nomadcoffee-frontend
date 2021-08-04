import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    username: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
  }
  type Mutation {
    createAccount(
        firstName: String!
        lastName: String
        username: String!
        email: String!
        password: String!
        name: String!
        location: String
        avatarURL: String
        githubUsername: String
    ): User
  }
  type Query {
    seeProfile(username: String!): User
  }
`;