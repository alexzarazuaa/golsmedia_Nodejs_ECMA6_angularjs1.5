class CommentCtrl {
    constructor(User) {

        'ngInject';

        this.$onInit = () => {
            console.log(this.news)

            if (User.current) {

                this.canModify = User.current.username === this.news.author.username ? true:User.current.username === this.data.author.username;
                
            } else {
                this.canModify = false;
            }

        }


    } //end_constructor



} //endclass


let Comment = {

    bindings: {
        data: '=',
        news : '=',
        deleteCm: '&'
    },
    controller: CommentCtrl,
    templateUrl: 'news/comment.html'
}

export default Comment;
