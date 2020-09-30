class News_Ctrl {
  constructor(newss, $scope, $stateParams, $filter) {
    "ngInject";

    console.log('llega al controler de news')
    this._$scope = $scope;


    this.newss = newss;
 
    console.log(newss);

    this.filter = $stateParams.filter;

    if (newss) {
      if ($stateParams.filter) {
        this.showFilter = true;
        this.filter = $stateParams.filter;
        this.infoWorld = $filter('filter')(newss.this.filter);
      } else {
        this.infoWorld = newss;
        this.showFilter = false;
      }


    } else {

        this.infoWorld = "error";
    }//end_if_newss


  }//end_constructor
}//end_classs

export default News_Ctrl;
