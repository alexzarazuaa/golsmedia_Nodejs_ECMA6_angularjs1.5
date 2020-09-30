
class HomeCtrl {
  constructor(AppConstants, $scope, world,Tags,User) {
    'ngInject';

    //COMPROBAR PRIMERO ESTE CONSOLE LOG DE NEWS
    console.log(world)

    //scope de neewss
      this.world=world;
     


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

      if(world){
        $scope.infoWorld = world.slice(0,3);
      }else{
        $scope.infoWorld = 'error';
      }

   
    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };



  }//end_constructor

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }



    

  }//end_constructor




//end_class

export default HomeCtrl;
