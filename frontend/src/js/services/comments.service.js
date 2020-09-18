export default class Comments {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }


  // Add a comment to an new
  add(slug, payload) {
    return this._$http({
      url: `${this._AppConstants.api}/news/${slug}/comments`,
      method: 'POST',
      data: { comment: { body: payload } }
    }).then((res) => res.data.comment);

  }

  getAll(slug) {
    return this._$http({
      url: `${this._AppConstants.api}/news/${slug}/comments`,
      method: 'GET',
    }).then((res) => res.data.comments);

  }

  destroy(commentId, newSlug) {
    return this._$http({
      url: `${this._AppConstants.api}/news/${newSlug}/comments/${commentId}`,
      method: 'DELETE',
    });
  }

}
