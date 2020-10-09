class DetailsNews_Ctrl {
    constructor(news, comments, User, $scope) {

        "ngInject";

        this._$scope = $scope;
        this.news = news;
        this._comments = comments;
        console.log('comentarios',comments)


        this.currentUser = User.current

        //

        this.resetCommentForm();


    }


    resetCommentForm() {
        this.commentForm = {
            isSubmitting: false,
            body: '',
            errors: []
        }
    }


    addComment() {
        this.commentForm.isSubmitting = true;
        this._Comments.add(this.news.slug, this.commentForm.body).then(
            (comment) => {
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
        console.log('boton pulsado')
        this._Comments.destroy(commentId, this.news.slug).then(
            (success) => {
                this.comment.splice(index, 1)
            }
        )

    }
}
export default DetailsNews_Ctrl;