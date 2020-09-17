export default class News {
    constructor(AppConstants, $http, $q,GraphQLClient) {
      "ngInject";
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
    }
 
    //LIST 
    getNews() {
      return this._$http({
        url: this._AppConstants.api + "/news/",
        method: "GET"
      }).then(res => {
        return res.data.hotels;
      });
    }
     
    //DETAILS
    getHotel(slug) {
      return this._$http({
        url: this._AppConstants.api + "/news/" + slug,
        method: "GET"
      }) //.then(res => res.data.hotel); //recibo 1 hotel
        .then(res => res.data.hotel);
    }

     //botón favoritos
  favorite(slug) {
    return this._$http({
      url: this._AppConstants.api + "/news/" + slug + "/favorite",
      method: "POST"
    });
  }
  //botón favoritos
  unfavorite(slug) {
    return this._$http({
      url: this._AppConstants.api + "/news/" + slug + "/favorite",
      method: "DELETE"
    });
  }
    
  }
  