class News_Ctrl {
    constructor(newss, $scope, $stateParams, $filter) {
            "ngInject";

            console.log('llega al controler de news')
            this._$scope = $scope;


            this.newss = newss;


            this.filter = $stateParams.filter;





        } //end_constructor



} //end_classs

export default News_Ctrl;