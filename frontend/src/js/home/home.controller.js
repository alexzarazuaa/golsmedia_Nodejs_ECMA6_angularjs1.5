
class HomeCtrl {
  constructor(AppConstants, $scope, newss,Tags,User) {
    'ngInject';

    //COMPROBAR PRIMERO ESTE CONSOLE LOG DE NEWS
    console.log(newss)

    //scope de neewss
      this.newss=newss;
      $scope.news = this.newss;


    this.appName = AppConstants.appName;
    this._$scope = $scope;


      // Get list of all tags
      Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

   
    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }



    

  }//end_constructor




//end_class

export default HomeCtrl;
