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
        });

};

export default OpinionsConfig;