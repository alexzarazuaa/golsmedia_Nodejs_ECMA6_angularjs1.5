import angular from 'angular';
console.log('entra en index js')

// Create the module where our functionality can attach to
let opinionsModule = angular.module('app.opinions', []);

// Include our UI-Router config settings
import OpinionsConfig from './opinions.config';
opinionsModule.config(OpinionsConfig);

// Controllers
import OpinionsCtrl from './opinions.controller';
opinionsModule.controller('OpinionsCtrl', OpinionsCtrl);



//ACTIONS COMPONENTS

// import OpinionsActions from './opinions-actions.component';
// opinionsModule.component('opinionsActions', OpinionsActions)




export default opinionsModule;