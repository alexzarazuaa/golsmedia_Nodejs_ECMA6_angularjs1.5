var router = require('express').Router();
var mongoose = require('mongoose');
var News = mongoose.model('News');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload news objects on routes with ':news'
router.param('news', function(req, res, next, slug) {
    News.findOne({ slug: slug })
        .populate('author')
        .then(function(news) {
            if (!news) { return res.sendStatus(404); }

            req.news = news;

            return next();
        }).catch(next);
});


// return all news
router.get('/', auth.optional, function(req, res, next) {
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
    ]).then(function(results) {
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
        ]).then(function(results) {
            var newss = results[0];
            var newssCount = results[1];
            var user = results[2];

            return res.json({
                newss: newss.map(function(news) {
                    return news.toJSONFor(user);
                }),
                newssCount: newssCount
            });
        });
    }).catch(next);
});
//

router.param('comment', function(req, res, next, id) {
    Comment.findById(id).then(function(comment) {
        if (!comment) { return res.sendStatus(404); }

        req.comment = comment;

        return next();
    }).catch(next);
});

router.get('/feed', auth.required, function(req, res, next) {
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        Promise.all([
            News.find({ author: { $in: user.following } })
            .limit(Number(limit))
            .skip(Number(offset))
            .populate('author')
            .exec(),
            News.count({ author: { $in: user.following } })
        ]).then(function(results) {
            var newss = results[0];
            var newssCount = results[1];

            return res.json({
                newss: newss.map(function(news) {
                    return news.toJSONFor(user);
                }),
                newssCount: newssCount
            });
        }).catch(next);
    });
});

///create noticias
router.post('/', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        var news = new News(req.body.news);

        news.author = user;

        return news.save().then(function() {
            console.log(news.author);
            return res.json({ news: news.toJSONFor(user) });
        });
    }).catch(next);
});

// return a new
router.get('/:news', auth.optional, function(req, res, next) {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
        req.news.populate('author').execPopulate()
    ]).then(function(results) {
        var user = results[0];

        return res.json({ news: req.news.toJSONFor(user) });
    }).catch(next);
});

// return a list of world
router.get('/news/world', function(req, res, next) {
    News.find().distinct('world').then(function(world) {
        //console.log(world);
        return res.json({ world: world });
    }).catch(next);
});

// update noticia
router.put('/:news', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
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

            req.news.save().then(function(news) {
                return res.json({ news: news.toJSONFor(user) });
            }).catch(next);
        } else {
            return res.sendStatus(403);
        }
    });
});

// delete noticia
router.delete('/:news', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        if (req.news.author._id.toString() === req.payload.id.toString()) {
            return req.news.remove().then(function() {
                return res.sendStatus(204);
            });
        } else {
            return res.sendStatus(403);
        }
    }).catch(next);
});

// Favorite  noticia
router.post('/:news/favorite', auth.required, function(req, res, next) {
    var newsId = req.news._id;

    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        return user.favorite(newsId).then(function() {
            return req.news.updateFavoriteCount().then(function(news) {
                return res.json({ news: news.toJSONFor(user) });
            });
        });
    }).catch(next);
});

// Unfavorite  noticia
router.delete('/:news/favorite', auth.required, function(req, res, next) {
    var newsId = req.news._id;

    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        return user.unfavorite(newsId).then(function() {
            return req.news.updateFavoriteCount().then(function(news) {
                return res.json({ news: news.toJSONFor(user) });
            });
        });
    }).catch(next);
});

// return an news's comments
router.get('/:news/comments', auth.optional, function(req, res, next) {
    Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user) {
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
        }).execPopulate().then(function(news) {
            return res.json({
                comments: req.news.comments.map(function(comment) {
                    return comment.toJSONFor(user);
                })
            });
        });
    }).catch(next);
});

// create a new comment
router.post('/:news/comments', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        var comment = new Comment(req.body.comment);
        comment.news = req.news;
        comment.author = user;

        return comment.save().then(function() {
            req.news.comments = req.news.comments.concat([comment])

            return req.news.save().then(function(news) {
                res.json({ comment: comment.toJSONFor(user) });
            });
        });
    }).catch(next);
});

//DELETE COMMENT
router.delete('/:news/comments/:comment', auth.required, function(req, res, next) {
    if (req.comment.author.toString() === req.payload.id.toString()) {
        req.news.comments.remove(req.comment._id);
        req.news.save()
            .then(Comment.find({ _id: req.comment._id }).remove().exec())
            .then(function() {
                res.sendStatus(204);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;