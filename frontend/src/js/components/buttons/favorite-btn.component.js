class FavoriteBtnCtrl {
    constructor(User, News, $state) {
        'ngInject';

        this._User = User;
        this._News = News;
        this._$state = $state;

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
                    this.isSubmitting = false;
                    this.news.favorited = false;
                    this.news.favoritesCount--;
                }
            )
        } else {
            this._News.favorite(this.news.slug).then(
                () => {
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