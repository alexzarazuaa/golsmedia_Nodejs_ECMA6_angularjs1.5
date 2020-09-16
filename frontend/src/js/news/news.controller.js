class News_Ctrl {
    constructor(news, $state, $scope, $stateParams) {
      "ngInject";
  
      this._$scope = $scope;
      //this.news = news.hotel; SI VAMOS POR GRAPHQL
  
      this.news=news;
  
      //this.filter = $stateParams.filter;
     
  
    //   var hotelesFiltrados = new Array();
    //   this.news.forEach(hotel => {
    //     if (hotel.category == this.filter) {
    //       hotelesFiltrados.push(hotel);
    //     }
    //   });
    //   $scope.hotelesFiltrados = hotelesFiltrados;
  
      this._$scope.openNew = function () {
        $state.go("app.detailsNews", { slug: this.hotel["slug"] });
      };
    }
  }
  
  export default News_Ctrl;
  