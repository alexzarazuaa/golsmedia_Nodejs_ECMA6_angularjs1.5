function NewsConfig($stateProvider) {
    "ngInject";

    $stateProvider

        .state("app.detailsNews", {
        url: "/news/:slug",
        controller: "DetailsNews_Ctrl", //name of class inside controller js
        controllerAs: "$ctrl",
        templateUrl: "news/detailsnews.html",
        title: "Details News",
        resolve: {
            news: function(News, $stateParams) {
                return News.getNeui($stateParams.slug).then(news => news); //recibo 1 news
            },
            comments: function(Comments, $stateParams) {
                return Comments.getAll($stateParams.slug).then(comment => comment);//recibir los comentarios
            }
        },

    })

    .state("app.news", {
        url: "/news",
        controller: "News_Ctrl",
        controllerAs: "$ctrl",
        templateUrl: "news/news.html",
        title: "Lista de Noticias",
        // resolve: {
        //     newss: function(News) { //newss the name that are in json of server
        //         return News.getNews().then(news => news);
        //     }
        // }
    })

    .state("app.filterWorld", {
        url: "/news_:filter",
        controller: "FilterWorldCtrl",
        controllerAs: "$ctrl",
        templateUrl: "news/worldFilter.html",
        title: "News",
        resolve: {
            newss: function(News) {
                return News.getNews().then(news => news);
            }
        }
    })



};

export default NewsConfig;