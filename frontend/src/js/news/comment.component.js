class CommentCtrl {
    constructor(User) {

            'ngInject';

           
            this.$onInit = () =>{

                if (User.current) {
                    this.canModify = (User.current.username === this.data.author.username);
                } else {
                    this.canModify = false;
                }
               
            }

         
        } //end_constructor



} //endclass


let Comment = {

    bindings: {
        data: '=',
        deletec: '&'
    },
    controller: CommentCtrl,
    templateUrl: 'news/comment.html'
}

export default Comment;
