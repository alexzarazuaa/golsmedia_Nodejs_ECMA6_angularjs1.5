class News_Ctrl {
    constructor(newss, $scope, $stateParams) {
      "ngInject";
  
      console.log('llega al controler de news')
      this._$scope = $scope;
   
  
      this.newss=newss;
      $scope.newss = this.newss;
      console.log(newss);
  
      this.filter = $stateParams.filter;
     
  
      var noticiasfiltradas = new Array();
      this.newss.forEach(news => {
        if (news.tagList == this.filter) {
          noticiasfiltradas.push(news);
        }
      });


      $scope.noticiasfiltradas = noticiasfiltradas;
      //console.log(noticiasfiltradas)
  
     
    }
  }
  
  export default News_Ctrl;
  