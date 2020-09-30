
function NewsConfig($stateProvider) {
    "ngInject";
  
    $stateProvider
  
      //MAS ADELANTE LA FILTRACION DE NOTICIAS
  
      .state("app.detailsNews", {
        url: "/news/:slug",
        controller: "DetailsNews_Ctrl", //name of class inside controller js
        controllerAs: "$ctrl",
        templateUrl: "news/detailsnews.html",
        title: "Details News",
        resolve: {
          news: function(News, $stateParams) {
            console.log("RESOLVE DE UNA NOTICIA");
            console.log(News);
            return News.getNeui($stateParams.slug).then(news => news); //recibo 1 news
          }
        }
      })

      .state("app.news", {
        url: "/news/:filter",
        controller: "News_Ctrl",
        controllerAs: "$ctrl",
        templateUrl: "news/news.html",
        title: "Lista de Noticias",
        resolve: {
          newss: function(News) { 
            console.log('noticias confign')//newss the name that are in json of server
            return News.getNews().then(news => news);
          }
        }
      })

  

  };
  
  export default NewsConfig;
  