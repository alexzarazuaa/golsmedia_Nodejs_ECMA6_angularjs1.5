class NewsListCtrl {

  constructor(News, $scope) {
    "ngInject";

    this._$scope = $scope;
    this._News = News;

    this.$onInit = () => {
      this.setListTo(this.listConfig);
    }

    $scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList);
    })

    //pagination

    $scope.$on('setPageTo', (ev, pageNumber) => {
      this.setPageTo(pageNumber);
    });


  }//end_constructor

  setListTo(newList) {
    this.list = [];
    this.listConfig = newList;
    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }


  runQuery() {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};

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

    // Run the query
    this._News
      .query(queryConfig)
      .then(
        (res) => {
          console.log('console res in run query',res)
          this.loading = false;
          // Update list and total pages
          this.list = res.newss;
          console.log('console res in run query news',res.newss)
          this.listConfig.totalPages = Math.ceil(res.newssCount / this.limit);
        }
      );
  }
}//end_class




let NewsList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: NewsListCtrl,
  templateUrl: 'components/news-helpers/news-list.html'
};
export default NewsList;
