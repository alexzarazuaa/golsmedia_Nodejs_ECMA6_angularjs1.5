class OpinionsListCtrl {
    constructor(Opinions, $scope) {
        "ngInject";
        console.log('---- OPINIONS LIST ----');
        this._Opinions = Opinions;

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
        this._Opinions
            .query()
            .then(
                (res) => {
                    console.log('console res in run query', res)
                    this.loading = false;
                    // Update list and total pages
                    this.list = res.opinions;
                    console.log('console res in run query opinions -->', res.opinions)
                }
            );
    }


}//End__OpinionsListCtrl

let OpinionList = {
    controller: OpinionsListCtrl,
    templateUrl: 'components/opinions-helpers/opinion-list.html'

}// End__OpinionList

export default OpinionList;