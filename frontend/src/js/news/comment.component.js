class CommentCtrl {
    constructor(User) {

            'ngInject';

           
            this.$onInit = () =>{

                if (User.current) {
                    this.canModify = (User.current.username === this.news.author.username);
                } else {
                    this.canModify = false;
                }
               
            }

         
        } //end_constructor



} //endclass


let Comment = {

    bindings: {
        data: '=',
        deletecomment: '&'
    },
    controller: CommentCtrl,
    templateUrl: 'news/comment.html'
}

export default Comment;