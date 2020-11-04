function OpinionsConfig($stateProvider) {
    'ngInject';
    console.log(" opinions config")
    $stateProvider
        .state('app.opinions', {
            url: '/opinions',
            controller: 'OpinionsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'opinions/opinions.html',
            title: 'opinions'
            // resolve:{
            //     opinions: function(Opinions) {
            //         return Opinions.all().then(opinion => opinion); //recibo 1 news
            //     }
            // },
        });

};

export default OpinionsConfig;