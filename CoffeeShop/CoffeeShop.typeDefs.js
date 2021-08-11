import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop
  }
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User
    photos(page: Int!): [CoffeeShopPhoto]
    categories(page: Int!): [Category]
  }
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
  }
`;
