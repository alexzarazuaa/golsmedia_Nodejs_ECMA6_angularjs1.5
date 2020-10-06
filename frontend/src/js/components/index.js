import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import NewsDetail from './news-helpers/news-detail.component';
componentsModule.component('newsDetail', NewsDetail);

import NewsList from './news-helpers/news-list.component';
componentsModule.component('newsList', NewsList);

import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import NewsPreview from './news-helpers/news-preview.component';
componentsModule.component('newsPreview', NewsPreview);

//slider components
import HomeSlider from './slider-helpers/homeSlider.component';
componentsModule.component('homeSlider', HomeSlider)


export default componentsModule;