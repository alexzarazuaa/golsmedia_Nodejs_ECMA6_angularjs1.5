
let router = require('express').Router();
let faker = require('faker');
faker.locale = "es";
let mongoose = require('mongoose');
let News = mongoose.model('News');
let User = mongoose.model('User');
let utils = require('./utils');


//FAKER DE USUARIOS
router.post('/users/:qty', async function (req, res, next) {
    console.log('entra')
    try {
        //console.log(req.params.qty)
        for (let i = 0; i < req.params.qty; i++) {
            console.log('entra for')
       
            let user = await new User();
            console.log(user);
            user.username = faker.internet.userName();
            user.idsocial = user.username;
            user.email = faker.internet.email();
            user.setPassword("password");

            //comprobamos si existe ya el usuario
            let check = await User.find({ $or: [{ 'email': user.email }, { 'idsocial': user.idsocial }] });
            if (!check[0]) {
                console.log(user);
                await user.save();
            }
      
            console.log(check);

            //creamos dos noticias por usuario
            await createNews(user.email, 2);
        }
        return res.sendStatus(200);
    } catch (e) {
        next(e)
    }
});


//CREATE NEWS
async function createNews(email, qty) {
    console.log('entra create news')
    try {
        //recogemos el email
        var email = email
        //primero obtenemos un usuario (en mi caso el que contiene este correo)
        var user = await utils.Searchuser(email);
        //hacemos un bucle por la cantidad
        for (let i = 0; i < qty; i++) {
            //ahora creamos la estructura de una noticia
            var news = await new News({
                title : faker.lorem.sentence(),
                description : faker.lorem.sentence(),
                body : faker.lorem.paragraph(),
                world : faker.lorem.words(),
                tagList : faker.lorem.words(),
                author: "",
                tagList: faker.lorem.words()
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


module.exports = router;