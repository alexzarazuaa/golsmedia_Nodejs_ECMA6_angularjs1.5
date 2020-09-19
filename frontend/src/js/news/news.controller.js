class News_Ctrl {
    constructor(newss, $state, $scope, $stateParams) {
      "ngInject";
  
      this._$scope = $scope;
   
  
      this.newss=newss;
      console.log(newss);
  
      this.filter = $stateParams.filter;
     
  
      // var noticiasfiltradas = new Array();
      // this.new.forEach(news => {
      //   if (news.category == this.filter) {
      //     noticiasfiltradas.push(news);
      //   }
      // });
      // $scope.noticiasfiltradas = noticiasfiltradas;
  
     
    }
  }
  
  export default News_Ctrl;
  