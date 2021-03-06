class SocialCtrl {
  constructor(User, $state, $scope, Toastr) {
    'ngInject';
    console.log('entra social controller')

    this._User = User;
    this._$state = $state;
    this._$scope = $scope;
    this._toastr = Toastr;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    //console.log("ENTRA CONTROLLER SOCIAL");
    //console.log(this.authType);
    this._User.attemptAuth(this.authType, null).then(

      (res) => {

        // alert("redirecto home sociallogin")

        this._toastr.showToastr('success', 'Successfully Logged In');
        location.reload();
        this._$state.go('app.home');

      },
      (err) => {
        console.log(err);
        this._toastr.showToastr('error', 'Error trying to login');
        this._$state.go('app.home');
      }
    )
  }
}
export default SocialCtrl;