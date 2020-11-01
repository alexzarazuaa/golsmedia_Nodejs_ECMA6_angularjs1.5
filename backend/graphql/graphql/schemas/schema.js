
const { gql } = require('apollo-server-express');


const Query = gql`
    scalar Date
    type Query {
        message: String
        authenticationError: String
    }
    type Mutation {
        _empty: String
    }
    
`;

let Opinion = require('./opinions/opinion.schema');
let User = require('./users/user.schema')


const typeDefs = [
    Query,
    Opinion,
    User
];


module.exports = typeDefs;
