function OpinionsConfig($stateProvider) {
    'ngInject';
    console.log(" opinions config")
    $stateProvider
        .state('app.DetailsOpinions', {
            url: '/opinions/:slug',
            controller: 'OpinionsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'opinions/opinion.html',
            title: 'opinion',
            resolve: {
                opinion: function (Opinions, $stateParams) {
                    return Opinions.queryOne($stateParams.slug).then(opinion => opinion); 
                },
            },
            
        })
        .state('app.opinions', {
            url: '/opinions',
            templateUrl: 'opinions/opinions.html',
            title: 'opinions'
        });



};

export default OpinionsConfig;