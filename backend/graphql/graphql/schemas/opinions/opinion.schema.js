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
        publishDate:String
    } 
    input OpinionInput {
        Slug:String
        type: String
        category:String
        description:String
        body:String
        publishDate:String
    }
`;

module.exports = typeDefs;