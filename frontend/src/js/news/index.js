import angular from 'angular';

// Create the module where our functionality can attach to
let newsModule = angular.module('app.news', []);

// Include our UI-Router config settings
import NewsConfig from './news.config';
newsModule.config(NewsConfig);


// Controllers
import Newsctrl from './news.controller';
newsModule.controller('Newsctrl', Newsctrl);

import DetailsNews_Ctrl from './detailsnews.controller';
newsModule.controller('DetailsNews_Ctrl',DetailsNews_Ctrl);


export default newsModule;