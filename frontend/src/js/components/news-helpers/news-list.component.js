class NewsListCtrl {

  constructor($scope){
    "ngInject";

    this._$scope = $scope;

  
  }
}




let NewsList = {
  bindings: {
    newss: '='
  },
  controller: NewsListCtrl,
  templateUrl: 'components/news-helpers/news-list.html'
};
export default NewsList;
