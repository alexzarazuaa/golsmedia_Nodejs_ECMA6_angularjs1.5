class CommentCtrl {
    constructor(User, $scope) {

            'ngInject';




            setTimeout(() => {
                if (User.current) {
                    this.canModify = (User.current.username === this.data.author.username);
                } else {
                    this.canModify = false;
                }
                $scope.apply();
            }, 1000);




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