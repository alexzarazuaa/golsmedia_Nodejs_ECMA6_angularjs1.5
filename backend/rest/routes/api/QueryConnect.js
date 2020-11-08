const axios = require('axios');

exports.OpinionsRequest = async function () {
    console.log("_----///////////////////////////-axios")

    let opinions = await axios({
        url: "http://localhost:3002/api/graphql",
        method: 'post',
        data: {
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
    });
    console.log("_------------------------axios")
    console.log(opinions.data.data.opinions)
    return opinions.data.data.opinions;
} 