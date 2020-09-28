export default class Newss {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;


  }
  //DEVULVE TODAS LAS NOTICIAS
  getNews(){
    return this._$http({
      url: this._AppConstants.api + "/news",
      method: "GET"
    }).then(res => {
      console.log(res.data.newss);
     
      return res.data.newss;
     
    });
  }

  //RECIBIR UNA NOTICIA

  getNeui(slug) {
    return this._$http({
      url: this._AppConstants.api + "/news/" + slug,
      method: "GET"
    }) 
      .then(res => res.data.news);
  }

  // query(config) {
  //   // Create the $http object for this request
  //   let request = {
  //     url: this._AppConstants.api + '/news' + ((config.type === 'feed') ? '/feed' : ''),
  //     method: 'GET',
  //     params: config.filters ? config.filters : null
  //   };
  //   return this._$http(request).then((res) => res.data);
  // }

  //DEVULVE SOLO UNA NOTICIA
  // getNews(slug) {
  //   let deferred = this._$q.defer();

  //   if (!slug.replace(" ", "")) {
  //     deferred.reject("news slug is empty");
  //     return deferred.promise;
  //   }

  //   this._$http({
  //     url: this._AppConstants.api + '/news/' + slug,
  //     method: 'GET'
  //   }).then(
  //     (res) => deferred.resolve(res.data.news),
  //     (err) => deferred.reject(err)
  //   );

  //   return deferred.promise;
  // }

  save(news) {
    let request = {};

    if (news.slug) {
      request.url = `${this._AppConstants.api}/news/${news.slug}`;
      request.method = 'PUT';
      delete news.slug;

    } else {
      request.url = `${this._AppConstants.api}/news`;
      request.method = 'POST';
    }

    request.data = { news: news };

    return this._$http(request).then((res) => res.data.news);
  }



  // favorite(slug) {
  //   return this._$http({
  //     url: this._AppConstants.api + '/news/' + slug + '/favorite',
  //     method: 'POST'
  //   })
  // }

  // unfavorite(slug) {
  //   return this._$http({
  //     url: this._AppConstants.api + '/news/' + slug + '/favorite',
  //     method: 'DELETE'
  //   })
  // }


}
