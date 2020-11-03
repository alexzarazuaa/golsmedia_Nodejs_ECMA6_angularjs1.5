export default class Opinions {
  constructor(AppConstants, $http, $q, GraphQLClient) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._GQL = GraphQLClient;

  }

  query(config) {
    if (!config.filters.offset) {
      config.filters.offset = 0;
    }
    if (!config.filters.limit) {
      config.filters.limit = 8;
    }
    let query = `
          query getOpinions {
            opinionsAndCount(limit:${config.filters.limit},offset:${config.filters.offset}) {
              id
              slug
              type
              category
              description
              body
              publishDate
            }
            opinionsCount
          }
        `;
    return this._GQL.get(query);
  }

  get(slug) {
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")) {
      deferred.reject("Opinion slug is empty");

      return deferred.promise;
    }

    let query = `
          query getOpinion {
            opinion(slug:"${slug}") {
                id
              slug
              type
              category
              description
              body
              publishDate
            }
          }
        `;
    return this._GQL.getAuth(query);
  }



  destroy(slug) {
    return this._$http({
      url: this._AppConstants.api + '/opinions/' + slug,
      method: 'DELETE'
    })
  }

  save(opinion) {
    let request = {};

    if (opinion.slug) {
      request.url = `${this._AppConstants.api}/opinions/${opinion.slug}`;
      request.method = 'PUT';
      delete opinion.slug;

    } else {
      request.url = `${this._AppConstants.api}/opinions/`;
      request.method = 'POST';
    }

    request.data = { opinion: opinion };

    return this._$http(request).then((res) => res.data.opinion);
  }




}