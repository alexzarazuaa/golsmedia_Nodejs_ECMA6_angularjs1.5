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
        world:'',
        tagList: []
      }
    } else {
      this.newss = news;
    }

  }

  addTag() {
    if (!this.news.tagList.includes(this.tagField)) {
      this.news.tagList.push(this.tagField);
      this.tagField = '';
      
    }
    console.log('tags',this.news.tagList)
  }

  addWorld(){
    console.log('enytra en addworld')
    if(!this.news.world.includes(this.WorldName)){
      this.news.world.push(this.WorldName);
      this.WorldName = '';
    }
    console.log('',this.WorldName)
  }

  removeWorld(newsWorld){
    this.news.world = this.news.world.filter((slug)=>slug != newsWorld);
  }


  removeTag(tagName) {
    this.news.tagList = this.news.tagList.filter((slug) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    this._News.save(this.news).then(
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
