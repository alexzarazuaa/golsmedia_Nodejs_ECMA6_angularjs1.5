class HomeCtrl {
    constructor($scope, world) {
        'ngInject';

        //COMPROBAR PRIMERO ESTE CONSOLE LOG DE NEWS
        // console.log(world)

        //scope de neewss
        this.world = world;
        this._$scope = $scope;




        if (world) {
            $scope.infoWorld = world.slice(0, 3);
        } else {
            $scope.infoWorld = 'error';
        }





    } //end_constructor





} //end_constructor




//end_class

export default HomeCtrl;