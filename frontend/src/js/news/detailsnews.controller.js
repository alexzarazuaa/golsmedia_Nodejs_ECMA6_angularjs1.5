class DetailsNews_Ctrl {
  constructor(news, $scope) {
      
      "ngInject";
      console.log(news)
      console.log("controller details")
      this._$scope = $scope;
      this.news = news;
      $scope.news = news;
  
  
    }
  }
  export default DetailsNews_Ctrl;
  