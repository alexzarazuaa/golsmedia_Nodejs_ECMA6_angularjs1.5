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
                world: function(News) { //world the name that are in json of server
                        return News.getWorld().then(world => world);
                    } //end_resolve_world
            }, //end_resolve
        });

};

export default HomeConfig;