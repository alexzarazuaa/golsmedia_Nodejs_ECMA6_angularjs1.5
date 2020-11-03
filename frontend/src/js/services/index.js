import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

// GRAPHQL CLIENT SERVICE
import GraphQLClientService from './graphql.service';
servicesModule.service('GraphQLClient', GraphQLClientService);

//opinions Service
import OpinionsService from './opinions.service';
servicesModule.service('Opinions',OpinionsService)


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import NewsService from './news.service';
servicesModule.service('News', NewsService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);

export default servicesModule;
