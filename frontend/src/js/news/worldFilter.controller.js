class FilterWorldCtrl {
    constructor(newss, $state, $scope, $stateParams) {
      "ngInject";

      this._$scope = $scope;

      this.newss=newss;

      this.filter = $stateParams.filter;


      let worlds = new Array();
      this.newss.forEach(news => {
        if (news.world == this.filter) {
          worlds.push(news);
        }
      });
      this.worlds = worlds;

  
    }
  }

  export default FilterWorldCtrl;
