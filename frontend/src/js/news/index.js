import angular from 'angular';

// Create the module where our functionality can attach to
let newsModule = angular.module('app.news', []);

// Include our UI-Router config settings
import NewsConfig from './news.config';
newsModule.config(NewsConfig);


// Controllers
import News_Ctrl from './news.controller';
newsModule.controller('News_Ctrl', News_Ctrl);

import DetailsNews_Ctrl from './detailsnews.controller';
newsModule.controller('DetailsNews_Ctrl',DetailsNews_Ctrl);

import FilterWorldCtrl from './worldFilter.controller';
newsModule.controller('FilterWorldCtrl', FilterWorldCtrl);



export default newsModule;