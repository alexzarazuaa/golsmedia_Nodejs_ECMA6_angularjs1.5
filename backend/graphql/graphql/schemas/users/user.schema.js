
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        user(username: String!): User
        users: [User]
    }
    type User {
        id: ID!
        idsocial: String
        username: String
        email: String
        image: String
        bio: String
        hash: String
        salt: String
    }
`;

module.exports = typeDefs;