class OpinionsListCtrl {

    constructor(Opinions, $scope) {
        "ngInject";

        console.log('ENTRA EN OPINIONS COMPONENT LIST')

        this._$scope = $scope;
        this._Opinions = Opinions;

        /**
         * defaul list 
          * we use an $onInit to catch the binding when loading
         */

        this.$onInit = () => {
            this.setListTo(this.listConfig);
        }


        $scope.$on('setListTo', (ev, newList) => {
             console.log('/////// --- NEW LIST --////',newList);
            this.setListTo(newList);
        });

        $scope.$on('setPageTo', (ev, pageNumber) => {
            this.setPageTo(pageNumber);
        });
    }

    setListTo(newList) {
        console.log(newList);

        // Set the current list to an empty array
        this.list = [];

        // Set listConfig to the new list's config
        this.listConfig = newList;

        this.runQuery();
    }

    setPageTo(pageNumber) {
        this.listConfig.currentPage = pageNumber;

        this.runQuery();
    }

    runQuery() {
        console.log("entra en runQuery");
        /**
         *  Show the loading indicator
         */
        this.loading = true;
        this.listConfig = this.listConfig || {};
        console.log(this.listConfig);

        let queryConfig = {
            type: this.listConfig.type || undefined,
            filters: this.listConfig.filters || {}
        };

        queryConfig.filters.limit = this.limit;

        /**If there is no page set, set the page to 1 by default */
        if (!this.listConfig.currentPage) {
            this.listConfig.currentPage = 1;
        }

        queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
        

        this._Opinions
            .query(queryConfig)
            .then(
                (res) => {
                    this.loading = false;
                    /** update the total pages */ 
                    this.list = res.opinions;
                    console.log(this.list);
                    this.listConfig.totalPages = Math.ceil(res.opinionsCount / this.limit);
                }
            );
    }

}

let OpinionList = {
    bindings: {
        limit: '=',
        listConfig: '='
    },
    controller: OpinionsListCtrl,
    templateUrl: 'components/opinions-helpers/opinion-list.html'
};
export default OpinionList;