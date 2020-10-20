let router = require('express').Router();
let faker = require('faker');
let mongoose = require('mongoose');
let News = require('News');
var User = mongoose.model('User');
var utils = require('./utils');

const router = express.Router();

// router.post('/news/:qty', async (req,res,next) =>{

//     try{

//         for (let i = 0; i < req.params.qty; i++) {
//             var news = await new News();
//              console.log(news);
//              news.title = faker.Lorem.sentence();
//              news.description = faker.Lorem.sentence();
//              news.body = faker.Lorem.paragraph();
//              news.world = faker.Lorem.words();
//              news.tagList = faker.Lorem.words();
//              var check = await News.find(
//                  {$or:[
//                      {'title':news.title},
//                      {'description':news.description}
//                  ]})
//              if(!check[0]){
//                 console.log(news);
//             }
//             await console.log(check);
//             await news.save();
//             //a cada nuevo usuario le metemos 5 YUKS
//             //await createyuks(user.email,5);


//         }//end_for

//     }catch(e){

//     }//end_catch

// })//end_Route

//FAKER DE USUARIOS
router.post('/users/:qty', async function (req, res, next) {
    try {
        for (let i = 0; i < req.params.qty; i++) {
            let user = await new User();
            console.log(user);
            user.idsocial = user.username + faker.random.number();
            user.username = faker.internet.userName();
            user.email = faker.internet.email();
            user.setPassword("password");

            //comprobamos si existe ya el usuario
            let check = await User.find({ $or: [{ 'email': user.email }, { 'idsocial': user.idsocial }] });
            if (!check[0]) {
                console.log(user);
            }
            await console.log(check);
            await user.save();
            //a cada nuevo usuario le metemos 5 YUKS
            await createyuks(user.email, 5);
        }
        return res.sendStatus(200);
    } catch (e) {
        next(e)
    }
});


//CREATE NEWS

async function createNews(email, qty) {
    try {
        //recogemos el email
        var email = email
        //primero obtenemos un usuario (en mi caso el que contiene este correo)
        var user = await utils.SearchUser(email);
        //hacemos un bucle por la cantidad
        for (let i = 0; i < qty; i++) {
            //ahora creamos la estructura de un yuk
            var news = await new News({
                title = faker.Lorem.sentence(),
                description = faker.Lorem.sentence(),
                body = faker.Lorem.paragraph(),
                world = faker.Lorem.words(),
                tagList = faker.Lorem.words(),
                author: "",
                tagList: faker.Lorem.words(number, 4)
            })
            //añadimos el usuario al campo author
            news.author = user;
            
            console.log(news);
            await news.save();
        }
        console.log("SAAAAVE");
    } catch (e) {
        console.log(e);
    }
}



export default router;
