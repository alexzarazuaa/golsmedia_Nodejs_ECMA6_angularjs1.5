const axios = require('axios');

const getOpinions = async () => {
    try {
        const res = await axios.get('http://localhost:3002/api');
        console.log(res.data.data);
    } catch (err) {
        console.error(err);
    }
};

getOpinions();