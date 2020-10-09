class NewsActionsCtrl {
    constructor(User, News,$state) {
            'ngInject';

    
            this._News = News;
            this._$state = $state;
            this.$onInit = () =>{

                if (User.current) {
                    this.canModify = (User.current.username === this.news.author.username);
                } else {
                    this.canModify = false;
                }
               
            }



        } //end constructor

              
        deleteNews() {
           // console.log('entra',this.news.slug)
            this.isDeleting = true;
            this._News.destroy(this.news.slug).then(
              (success) => this._$state.go('app.home'),
              (err) => this._$state.go('app.home')
            )
          }

} //end_class

let NewsActions = {

    bindings: {
        news: '='
    },
    controller: NewsActionsCtrl,
    templateUrl: 'news/news-actions.html'


}



export default NewsActions;