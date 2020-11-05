class FavoriteBtnCtrl {
    constructor(User, News, $state,Toastr) {
        'ngInject';

        this._User = User;
        this._News = News;
        this._$state = $state;
        this._toastr=Toastr

    }

    submit() {
        this.isSubmitting = true;

        if (!this._User.current) {
            this._$state.go('app.register');
            return;
        }

        if (this.news.favorited) {
            this._News.unfavorite(this.news.slug).then(
                () => {
                    this._toastr.showToastr('error', '-10 KarmaPoints');
                    this.isSubmitting = false;
                    this.news.favorited = false;
                    this.news.favoritesCount--;
                }
            )
        } else {
            this._News.favorite(this.news.slug).then(
                () => {
                    this._toastr.showToastr('success', '+10 KarmaPoints');
                    this.isSubmitting = true;
                    this.news.favorited = true;
                    this.news.favoritesCount++;
                }
            )
        }

    }

}

let FavoriteBtn = {
    bindings: {
        news: '='
    },
    transclude: true,
    controller: FavoriteBtnCtrl,
    templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;