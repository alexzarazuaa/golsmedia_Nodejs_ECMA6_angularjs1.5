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

// import NewsMeta from './news-helpers/news-meta.component';
// componentsModule.component('newsMeta', NewsMeta);

import ListPagination from './news-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);


// OPINIONS COMPONENTS

import OpinionMeta from './opinions-helpers/restaurant-meta.component';
componentsModule.component('restaurantMeta', RestaurantMeta);

import RestaurantPreview from './restaurant-helpers/restaurant-preview.component';
componentsModule.component('restaurantPreview', RestaurantPreview);

import RestaurantList from './restaurant-helpers/restaurant-list.component';
componentsModule.component('restaurantList', RestaurantList);

export default componentsModule;