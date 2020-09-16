class DetailsNews_Ctrl {
    constructor(news, $scope) {
      //esto se llama desde news.config (resolve)
      
      "ngInject";
      this._$scope = $scope;
      $scope.news = news;
  
      this._$scope.atras = function() {
        $state.go("app.news", { filter: this.hotel.category });
      };
    }
  }
  export default DetailsNews_Ctrl;
  