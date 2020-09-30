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
        world: function(News) { //newss the name that are in json of server
          //console.log('noticias resolve news')
          return News.getWorld().then(world => world);
        }//end_resolve_news
    }//end_resolve
  });

};

export default HomeConfig;
