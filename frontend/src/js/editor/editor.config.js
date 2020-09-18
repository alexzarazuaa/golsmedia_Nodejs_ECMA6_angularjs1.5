function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.editor', {
    url: '/editor/:slug',
    controller: 'EditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'editor/editor.html',
    title: 'Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      news: function(News, User, $state, $stateParams) {

        if ($stateParams.slug) {

          return News.get($stateParams.slug).then(
            (news) => {
              if (User.current.username === news.author.username) {
                return news;
              } else {
                $state.go('app.home');
              }
            },
            (err) => $state.go('app.home')
          )

        } else {
          return null;
        }

      }
    }
  });

};

export default EditorConfig;
