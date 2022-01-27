const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Category {
    _id: ID
    name: String
  }

  type Gift {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    gifts: [Gift]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    gifts(category: ID, name: String): [Gift]
    gift(_id: ID!): Gift
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateGift(_id: ID!, quantity: Int!): Gift
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;