
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


      .state("app.detailsHotels", {
        url: "/hotels/:slug",
        controller: "DetailsHotelsCtrl",
        controllerAs: "$ctrl",
        templateUrl: "hotels/detailshotels.html",
        title: "Details Hotels",
        resolve: {
          hotel: function(Hotels, $stateParams) {
            //este nombre es el que recibe el controlador
            return Hotels.getHotel($stateParams.slug).then(hotel => hotel); //recibo 1 hotel
          }
        }
      })

      .state("app.news", {
        url: "/news",
        controller: "News_Ctrl",
        controllerAs: "$ctrl",
        templateUrl: "news/news.html",
        title: "Lista de Noticias",
        resolve: {
          newss: function(News) { //newss the name that are in json of server
            return News.getNews().then(news => news);
          }
        }
      })

  

  };
  
  export default NewsConfig;
  