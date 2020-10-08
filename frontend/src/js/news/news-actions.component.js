class NewsActionsCtrl {
    constructor(User, News) {
            'ngInject';

    
            this._News = News;
            this.$onInit = () =>{

                if (User.current) {
                    this.canModify = (User.current.username === this.news.author.username);
                } else {
                    this.canModify = false;
                }
               
            }

         
           


        } //end constructor

} //end_class

let NewsActions = {

    bindings: {
        news: '='
    },
    controller: NewsActionsCtrl,
    templateUrl: 'news/news-actions.html'


}



export default NewsActions;