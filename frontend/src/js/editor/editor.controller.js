class EditorCtrl {
  constructor(News, news, $state) {
    'ngInject';

    this._News = News;
    this._$state = $state;

    if (!news) {
      this.news = {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    } else {
      this.news = news;
    }

  }

  addTag() {
    if (!this.news.tagList.includes(this.tagField)) {
      this.news.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName) {
    this.news.tagList = this.news.tagList.filter((slug) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    this._news.save(this.news).then(
      (newNews) => {
        this._$state.go('app.news', { slug: newNews.slug });
      },

      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }

    )
  }



}


export default EditorCtrl;
