import angular from 'angular';

let componentsModule = angular.module('app.components', []);



import  NewsDetail from './news-helpers/news-detail.component';
componentsModule.component('newsDetail', NewsDetail);

import NewsList from './news-helpers/news-list.component';
componentsModule.component('newsList', NewsList);





export default componentsModule;
