import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User
    file: String!
    caption: string
    hashtags: [hashtag]
    createdAt: String!
    updatedAt: String!
    likes: Int!
  }

  type hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
