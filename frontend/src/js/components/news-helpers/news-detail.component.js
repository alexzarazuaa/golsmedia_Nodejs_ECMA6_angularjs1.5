
class NewsDetailctrl {
  constructor($scope) {
    "ngInject";

    this._$scope = $scope;


  }
}

let NewsDetail = {
  bindings: {
    news: '='
  },
  controller: NewsDetailctrl,
  templateUrl: 'components/news-helpers/news-detail.html'
};


export default NewsDetail;

