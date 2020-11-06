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
        /**
         *          PREGUNTAR AÇO NO FARÍA FALTA
         * 
             // Create an object for this query
                let queryConfig = {
                    type: this.listConfig.type || undefined,
                    filters: this.listConfig.filters || {}
                };

                // Set the limit filter from the component's attribute
                queryConfig.filters.limit = this.limit;

                // If there is no page set, set page as 1
                if (!this.listConfig.currentPage) {
                    this.listConfig.currentPage = 1;
                }

                // Add the offset filter
                queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
         */


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