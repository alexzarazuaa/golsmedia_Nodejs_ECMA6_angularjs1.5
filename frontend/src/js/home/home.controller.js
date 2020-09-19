
class HomeCtrl {
  constructor(AppConstants, $scope,News) {
    'ngInject';
    //COMPROBAR PRIMERO ESTE CONSOLE LOG DE NEWS

    this.News=News;


    this.appName = AppConstants.appName;
    this._$scope = $scope;
    console.log();
   
    News
    .getNews()
    .then(
      (news) => {
       $scope.news = news;
        console.log(news)
      }
    );
      

    

  }




}

export default HomeCtrl;
