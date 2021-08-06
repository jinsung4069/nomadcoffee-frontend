import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
    bio: String
  }
`;