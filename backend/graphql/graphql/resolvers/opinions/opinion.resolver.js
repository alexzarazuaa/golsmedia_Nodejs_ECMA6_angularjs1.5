const mongoose = require('mongoose');
const Opinion = mongoose.model('Opinion');
//const User = mongoose.model('User');
//const City = mongoose.model('City');

const resolvers = {
    Query: {
      opinion: (root, {slug}) => {
        return Opinion.findOne({slug: slug}).exec();
      },
      opinions  : () =>  {
        return Opinion.find().exec();
      }
    },
    Mutation: {
      createOpinion: (root, {input}) => {
          const opinion = new Opinion(input);
          opinion.save();
          console.log(opinion,"entra");
          return opinion;
      }
    }

};

module.exports = resolvers;