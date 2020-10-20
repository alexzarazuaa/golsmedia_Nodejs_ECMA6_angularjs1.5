let router = require ('express').Router();
let faker = require ('faker');
let mongoose = require('mongoose');
let News = require('News');
var User = mongoose.model('User');
var utils = require('./utils');

const router = express.Router();

router.post('/news/:qty', async (req,res,next) =>{

    try{

        for (let i = 0; i < req.params.qty; i++) {
            var news = await new News();
             console.log(news);
             news.title = faker.Lorem.sentence();
             news.description = faker.Lorem.sentence();
             news.body = faker.Lorem.paragraph();
             news.world = faker.Lorem.words();
             news.tagList = faker.Lorem.words();
             var check = await News.find(
                 {$or:[
                     {'title':news.title},
                     {'description':news.description}
                 ]})
             if(!check[0]){
                console.log(news);
            }
            await console.log(check);
            await news.save();
            //a cada nuevo usuario le metemos 5 YUKS
            //await createyuks(user.email,5);
   

        }//end_for

    }catch(e){

    }//end_catch

})//end_Route



//CREATE NEWS



export default router;
