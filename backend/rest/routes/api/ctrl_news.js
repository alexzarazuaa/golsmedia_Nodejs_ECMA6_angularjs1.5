var router = require('express').Router();
var mongoose = require('mongoose');
var News = mongoose.model('News');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');
let utils = require('../utils/UsersUtils')
let NewsUtils = require('../utils/NewsUtils')
let query = require('./QueryConnect');

// Preload news objects on routes with ':news'
router.param('news', function (req, res, next, slug) {
    News.findOne({ slug: slug })
        .populate('author')
        .then(function (news) {
            if (!news) { return res.sendStatus(404); }

            req.news = news;

            return next();
        }).catch(next);
});




// return all news
router.get('/', auth.optional, function (req, res, next) {
    var query = {};
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    if (typeof req.query.tag !== 'undefined') {
        query.tagList = { "$in": [req.query.tag] };
    }

    Promise.all([
        req.query.author ? User.findOne({ username: req.query.author }) : null,
        req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
    ]).then(function (results) {
        var author = results[0];
        var favoriter = results[1];

        if (author) {
            query.author = author._id;
        }

        if (favoriter) {
            query._id = { $in: favoriter.favorites };
        } else if (req.query.favorited) {
            query._id = { $in: [] };
        }

        return Promise.all([
            News.find(query)
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ createdAt: 'desc' })
                .populate('author')
                .exec(),
            News.count(query).exec(),
            req.payload ? User.findById(req.payload.id) : null,
        ]).then(function (results) {
            var newss = results[0];
            var newssCount = results[1];
            var user = results[2];

            return res.json({
                newss: newss.map(function (news) {
                    return news.toJSONFor(user);
                }),
                newssCount: newssCount
            });
        });
    }).catch(next);
});

//Return feed news 
router.get('/feed', auth.required, function (req, res, next) {
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        Promise.all([
            News.find({ author: { $in: user.following } })
                .limit(Number(limit))
                .skip(Number(offset))
                .populate('author')
                .exec(),
            News.count({ author: { $in: user.following } })
        ]).then(function (results) {
            var newss = results[0];
            var newssCount = results[1];

            return res.json({
                newss: newss.map(function (news) {
                    return news.toJSONFor(user);
                }),
                newssCount: newssCount
            });
        }).catch(next);
    });
});

//
router.param('comment', function (req, res, next, id) {
    Comment.findById(id).then(function (comment) {
        if (!comment) { return res.sendStatus(404); }

        req.comment = comment;

        return next();
    }).catch(next);
});


///create noticias
//INCREMENTAMOS EL KARMA DE UN USUARIO CADA VEZ QUE CREE UNA NOTICIA
router.post('/', auth.required, async function (req, res, next) {
    try {
        let user = await User.findById(req.payload.id)
        console.log(user)
        if (!user) { return res.sendStatus(401); }

        let news = News(req.body.news);

        news.author = user;

        await news.save();

        console.log(news.author);
        await utils.increaseKarmaByUserId(user.id, 25);
        return res.json({ news: news.toJSONFor(user) });
    } catch (error) {
        next(error);
    }



});



/**
 * OPINIONS BACKEND COMUNICATION
 * REVIEWS WITH THE SAME CATEGORY OR TYPE FROM GRAPHQL
 */

router.get('/opinions', function(req, res, next) {

    const request = require('request');
    request(`http://localhost:3002/api?query={opinions}`, function (error, response, body) {
      if (error) {
        console.error('error:', error); 
      } else {
        let results = JSON.parse(body);
        return res.json({opinion: req.opinion.toJSONFor()});
      }
    });
  });


// CREAR NOTICIAS CON EL ASYNC Y EL AWAIT ADEMAS DE UTILIZAR LA FUNCION DE SI ES ADMIN
//SOLO PUEDE CREAR NOTICIAS SI ES ADMIN

// router.post('/', auth.required, async (req, res, next) => {
//     try {
//         let admin = await utils.IsAdminUser(req.payload.email);

//       await User.findById(req.payload.id).then(function (user) {
//             console.log(user)
//             if (!user) { return res.sendStatus(401); }
//             else {
//                 console.log('+++++++++++++++++', admin)
//                 if (admin ) {

//                     let news = new News(req.body.news);

//                     news.author = user;

//                     return news.save().then(function () {
//                         // console.log(news.author);
//                         return res.json({ news: news.toJSONFor(user) });
//                     });
//                 }
//                 else {
//                     console.log('unauthorized')
//                     return res.status(422).json('error');
//                 }
//             }
//         }).catch(next);


//     } catch (e) {
//         next(e);
//     }
// });


// router.post('/', auth.required, async (req, res, next) => {
//     try {
//         // Comprobar datos obligatorios
//         if (!await utils.IsAdminUser(req.payload.email))
//             return res.status(401).json({ error: 'Unauthorized' });
//         User.findById(req.payload.id).then( async function  (user) {
//             console.log(user)
//             if (!user) { return res.sendStatus(401); }

//             var news = new News(req.body.news);

//             news.author = user;

//             // Crear recurso
//             var news = new News();
//             news.title = req.body.news.title;
//             news.type = type;
//             news.description = req.body.news.description;
//             news.body = req.body.news.body;
//             news.world = req.body.news.world;
//             news.tagList = req.body.news.tagList;
//             await news.save();
//             return res.status(201).send({ news });
//         });
//     } catch (e) {
//         next(e);
//     }
// });


// return a new
router.get('/:news', auth.optional, function (req, res, next) {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
        req.news.populate('author').execPopulate()
    ]).then(function (results) {
        var user = results[0];

        return res.json({ news: req.news.toJSONFor(user) });
    }).catch(next);
});

// return a list of world
router.get('/news/world', function (req, res, next) {
    News.find().distinct('world').then(function (world) {
        //console.log(world);
        return res.json({ world: world });
    }).catch(next);
});

// update noticia
router.put('/:news', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (req.news.author._id.toString() === req.payload.id.toString()) {
            if (typeof req.body.news.title !== 'undefined') {
                req.news.title = req.body.news.title;
            }

            if (typeof req.body.news.description !== 'undefined') {
                req.news.description = req.body.news.description;
            }

            if (typeof req.body.news.body !== 'undefined') {
                req.news.body = req.body.news.body;
            }

            if (typeof req.body.news.tagList !== 'undefined') {
                req.news.tagList = req.body.news.tagList
            }

            req.news.save().then(function (news) {
                return res.json({ news: news.toJSONFor(user) });
            }).catch(next);
        } else {
            return res.sendStatus(403);
        }
    });
});

/**  BORRAR LOS COMENTARIOS DE LA NOTICIA Y DESPUES BORRA LA NOTICIA*/

router.delete('/:news', auth.required, async function (req, res, next) {

    try {
        let user = await User.findById(req.payload.id)
        if (!user) { return res.sendStatus(401); }
        if (req.news.author._id.toString() === req.payload.id.toString()) {
            //buscamos los commentarios y los borramos  y despues  borramos la noticia
            let deleted = await NewsUtils.DeleteNews(req.news)
            if (deleted) return res.sendStatus(204);
        } else {
            return res.sendStatus(403);
        }
    } catch (error) {
        next(error);
    }
});



// Favorite  noticia
//CADA VEZ QUE UN USUARIO DE LIKE SE LE AUMENTARA EL KARMA EN 10
router.post('/:news/favorite', auth.required, async function (req, res, next) {
    try {
        var newsId = await req.news._id;
        console.log(req.news._id);
        let user = await User.findById(req.payload.id)
        if (!user) { return res.sendStatus(401); }

        return user.favorite(newsId).then(function () {
            return req.news.updateFavoriteCount().then(function (news) {
                utils.increaseKarmaByUserId(user.id, 10)
                return res.json({ news: news.toJSONFor(user) });
            });
        });

    } catch (error) {
        next(error)

    }

});

// Unfavorite  noticia
//CADA VEZ QUE UN USUARIO BORRE UN  LIKE SE LE RESTARÁ EL KARMA EN 10
router.delete('/:news/favorite', auth.required, async function (req, res, next) {

    try {
        let newsId = await req.news._id;
        let user = await User.findById(req.payload.id);
        if (!user) { return res.sendStatus(401); }

        return user.unfavorite(newsId).then(function () {
            return req.news.updateFavoriteCount().then(function (news) {
                utils.increaseKarmaByUserId(user.id, -10)
                return res.json({ news: news.toJSONFor(user) });
            });
        });
    } catch (error) {
        next(error)
    }


});

// return an news's comments
router.get('/:news/comments', auth.optional, function (req, res, next) {
    Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
        return req.news.populate({
            path: 'comments',
            populate: {
                path: 'author'
            },
            options: {
                sort: {
                    createdAt: 'desc'
                }
            }
        }).execPopulate().then(function (news) {
            return res.json({
                comments: req.news.comments.map(function (comment) {
                    return comment.toJSONFor(user);
                })
            });
        });
    }).catch(next);
});

/** CREATE NEW COMMENT 
 * CADA VEZ QUE UN USUARIO CREE UN COMENTARIO SE LE AUMENTARA EL KARMA EN 10
 */
router.post('/:news/comments', auth.required, async function (req, res, next) {

    try {
        let user = await User.findById(req.payload.id);
        if (!user) { return res.sendStatus(401); }

        let comment = new Comment(req.body.comment);
        comment.news = req.news;
        comment.author = user;

        await comment.save();
        req.news.comments = req.news.comments.concat([comment]);
        req.news.CommentsCount += 1;


        await req.news.save();

        await utils.increaseKarmaByUserId(user.id, 10);
        console.log(req.news.CommentsCount);

        // await req.news.updateCommentsCount();
        res.json({ comment: comment.toJSONFor(user) });
    } catch (error) {
        next(error);
    }

})

//DELETE COMMENT
router.delete('/:news/comments/:comment', auth.required, async function (req, res, next) {
    if ((req.comment.author.toString() === req.payload.id.toString()) || (req.news.author._id.toString() === req.payload.id.toString())) {

        await req.news.comments.remove(req.comment._id);
        req.news.CommentsCount--;
        await req.news.save();

        await Comment.find({ _id: req.comment._id }).remove().exec();
        res.sendStatus(204);

    } else {
        res.sendStatus(403);
    }
});

module.exports = router;