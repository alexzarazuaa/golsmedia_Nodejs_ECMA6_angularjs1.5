function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider

  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.register', { //cuando clickamos en register
    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Regístrate',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.sociallogin', {//socialLogin
    url: '/auth/sociallogin',
    controller: 'SocialCtrl as $ctrl',
    title: 'Sign up with SocialLogin',
     resolve: {
       auth: function(User) {
         return User.ensureAuthIs(false);
       }
     }
  });

  
};



export default AuthConfig;
