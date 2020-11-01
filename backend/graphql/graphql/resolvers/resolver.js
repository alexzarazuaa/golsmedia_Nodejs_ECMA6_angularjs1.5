var { merge } = require('lodash');

const QueryResolvers = {
    Query: {
        message: () => 'Hello World!',
        authenticationError: () => {
            throw new AuthenticationError('must authenticate');
        }
    }
}

let OpinionsResolvers = require('./opinions/opinion.resolver');
let UserResolvers = require('./users/user.resolver')


const resolvers = merge(
    QueryResolvers,
    OpinionsResolvers,
    UserResolvers
);

module.exports = resolvers;