const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        opinion(slug: String!): Opinion
        opinions: [Opinion ]
    }
    extend type Mutation {
        createOpinion(input: OpinionInput): Opinion
    }
    type Opinion {
        id: ID!
        slug: String!
        type: String
        category:String
        description:String
        body:String
        publishDate:Date
    } 
    input OpinionInput {
        type: String
        category:String
        description:String
        body:String
        publishDate:Date
    }
`;

module.exports = typeDefs;