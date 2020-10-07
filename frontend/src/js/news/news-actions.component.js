class NewsActionsCtrl {
    constructor(User, News, $scope) {
            'ngInject';

            this.News = News;

            setTimeout(() => {
                if (User.current) {
                    this.canModify = (User.current.username === this.article.author.username);
                } else {
                    this.canModify = false;
                }
                $scope.apply();
            }, 1000);




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