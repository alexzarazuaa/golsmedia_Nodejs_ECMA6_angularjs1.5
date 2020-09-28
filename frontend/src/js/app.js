import angular from 'angular';

// Import our app config files
import constants  from './config/app.constants';
import appConfig  from './config/app.config';
import appRun     from './config/app.run';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
// Import our templates file (generated by Gulp)
import './config/app.templates';
// Import our app functionaity
import toastr from 'angular-toastr';
import 'angular-messages';
import './layout';
import './components'; //adding components
import './home';
import './profile';
import './news';  // add first model news
import './services';
import './auth';
import './settings';
import './editor';


// Create and bootstrap application
const requires = [
  'ui.router',
  'ui.bootstrap',
  'templates',
  'app.layout',
  'app.components', //adding components
  'app.home',
  'app.profile',
  'app.news', // add first model news, carregara cuando den click en el menu
  'app.services',
  'app.auth',
  'app.settings',
  'app.editor',
  'ngMessages',
  toastr
];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
