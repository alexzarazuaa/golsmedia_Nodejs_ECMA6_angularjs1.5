class DetailsNews_Ctrl {
    constructor(news, Comments, comments,User, $scope) {

        "ngInject";

        this._$scope = $scope;
        this.news = news;
        console.log(this.news)
        this._Comments = Comments;
        this.comments = comments;
        this.currentUser = User.current

        //

        this.resetCommentForm();


    }//end_construtor


    resetCommentForm() {
        this.commentForm = {
            isSubmitting: false,
            body: '',
            CommentsCount:0,
            errors: []
        }
    }

    addComment() {
        this.commentForm.isSubmitting = true;
        this._Comments.add(this.news.slug, this.commentForm.body).then(
            (comment) => {
                this.news.CommentsCount++;
                this.comments.unshift(comment);
                this.resetCommentForm();


            },
            (err) => {
                this.comment.isSubmitting = false;
                this.commentForm.errors = err.data.errors;
            }
        )
    }

    deleteComment(commentId, index) {
        console.log('entra en delete comment');
        console.log('id',commentId);
        this._Comments.destroy(commentId, this.news.slug).then(
            (success) => {
                this.comments.splice(index, 1);
                this.news.CommentsCount--;
            }
        )

    }



}//end_ctrl
export default DetailsNews_Ctrl;