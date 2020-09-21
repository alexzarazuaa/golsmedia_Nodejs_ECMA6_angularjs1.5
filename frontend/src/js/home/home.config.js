function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
      resolve: {
        newss: function(News) { 
          console.log('noticias resolve news')//newss the name that are in json of server
          return News.getNews().then(news => news);
        }//end_resolve_news
    }//end_resolve
  });

};

export default HomeConfig;
