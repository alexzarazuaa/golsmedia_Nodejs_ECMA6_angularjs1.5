import Newss from "../services/news.service";

class HomeCtrl {
  constructor(AppConstants, $scope,News) {
    'ngInject';

    this.appName = AppConstants.appName;
    // console.log(this.appName);
    this._$scope = $scope;
    console.log();

    this.News = News;
  

    News
    .getNews()
    .then(
      (news) => {
       
        return news;
      }
    );

  }




}

export default HomeCtrl;
