
function NewsConfig($stateProvider) {
    "ngInject";
  
    $stateProvider
  
  
      // .state("app.news", {
      //   url: "/news:filter",
      //   controller: "News_Ctrl",
      //   controllerAs: "$ctrl",
      //   templateUrl: "new/news.html",
      //   title: "News",
      //   resolve: {
      //     news: function(news) {
      //       return news.getnews().then(news =>news);
      //     }
      //   }
      // })

      //MAS ADELANTE LA FILTRACION DE NOTICIAS
  
      .state("app.news", {
        url: "/news",
        controller: "News_Ctrl",
        controllerAs: "$ctrl",
        templateUrl: "news/news.html",
        title: "Lista de Noticias",
        resolve: {
          newss: function(News) {
            return News.getNews().then(news => news);
          }
        }
      })
  
      .state("app.detailsNews", {
        url: "/news/:slug",
        controller: "DetailsNews_Ctrl", //name of class inside controller js
        controllerAs: "$ctrl",
        templateUrl: "news/detailsnews.html",
        title: "Details News",
        resolve: {
          news: function(News, $stateParams) {
            //este nombre es el que recibe el controlador
            return News.getNewss($stateParams.slug).then(news => news); //recibo 1 news
          }
        }
      })
  };
  
  export default NewsConfig;
  