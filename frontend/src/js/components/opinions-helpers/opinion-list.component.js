class OpinionsListCtrl {
    constructor(Opinions, $scope,News) {
        "ngInject";
        console.log('---- OPINIONS LIST ----');
        this._Opinions = Opinions;
        this._News=News;

        this.$onInit = () => {
            this.setListTo(this.listConfig);
        }

        $scope.$on('setListTo', (ev, newList) => {
            this.setListTo(newList);
        })


    }

    setListTo(newList) {
        this.list = [];
        this.listConfig = newList;
        this.runQuery();
    }

    runQuery() {
        // Show the loading indicator
        this.loading = true;
        this.listConfig = this.listConfig || {};
        // Run the query
        this._News
          .listOpinions()
          .then(
            (res) => {
              console.log('console res in run query', res.opinions[0].category)
              this.list = res.opinions;
              console.log('console res in run query opinions -->', this.list)
    
    
            }
          );
        }
      


}//End__OpinionsListCtrl

let OpinionList = {
    controller: OpinionsListCtrl,
    templateUrl: 'components/opinions-helpers/opinion-list.html'

}// End__OpinionList

export default OpinionList;