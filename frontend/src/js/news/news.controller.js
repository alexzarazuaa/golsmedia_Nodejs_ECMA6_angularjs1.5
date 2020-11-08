

class News_Ctrl {
    constructor(AppConstants, $scope,$state, $stateParams, Tags, User) {
        "ngInject";

        console.log('llega al controler de news')
        // console.log('----------->',request.getOpinions());
        this._$scope = $scope;
     

        this.appName = AppConstants.appName;
        // this.newss = newss;
        this.filter = $stateParams.filter;
        
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
    
        console.log(this.listConfig)





    } //end_constructor

    changeList(newList) {
        this._$scope.$broadcast('setListTo', newList);
    };

} //end_classs

export default News_Ctrl;