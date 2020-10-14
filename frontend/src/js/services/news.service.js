export default class Newss {
    constructor(AppConstants, $http, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;


    }
    //DEVULVE TODAS LAS NOTICIAS
    getNews() {
        return this._$http({
            url: this._AppConstants.api + "/news",
            method: "GET"
        }).then(res => {
            console.log(res.data.newss);

            return res.data.newss;

        });
    }

    //http object for the request
    query(config) {
        let request = {
            url: this._AppConstants.api + '/news' + ((config.type == 'feed') ? '/feed' : ''),
            method: 'GET',
            params: config.filters ? config.filters : null
        };
        return this._$http(request).then((res) => res.data);
    }

    //RECIBIR UNA NOTICIA

    getNeui(slug) {
        return this._$http({
            url: this._AppConstants.api + "/news/" + slug,
            method: "GET"
        })
            .then(res => res.data.news);
    }

    getWorld() {
        return this._$http({
            url: this._AppConstants.api + "/news/news/world",
            method: "GET"
        }).then(res => {
            return res.data.world;

        });
    }


    //delete news
    destroy(slug) {
        return this._$http({
            url: this._AppConstants.api + '/news/' + slug,
            method: 'DELETE'
        })
    }


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


    // FAVORITE AND UNFAVORITE

    favorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/news/' + slug + '/favorite',
            method: 'POST'
        })
    }

    unfavorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/news/' + slug + '/favorite',
            method: 'DELETE'
        })
    }



}