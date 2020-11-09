const axios = require('axios');

exports.OpinionsRequest = async function () {
    console.log("_----///////////////////////////-axios")

    try {
      const res = await axios.get('http://902b83ae5387:3002/api/graphql', {
  
        params: {
          query: `
          query getOpinions {
            opinions{
              id
              slug
              type
              category
              description
              body
              publishDate
            }
             
          }
          `
        }
      })
      return (res.data.data.opinions);
    } catch (err) {
      console.error(err);
    }
} 
