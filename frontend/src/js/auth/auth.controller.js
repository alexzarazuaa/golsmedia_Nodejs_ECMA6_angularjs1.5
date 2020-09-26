class AuthCtrl {
  constructor(User, $state, auth, Toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    this._toastr = Toastr;

  }

  submitForm() {
    this.isSubmitting = true;

    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        this._toastr.showToastr('success', 'Your are Loggin in');
        this._$state.go('app.home');

      },
      (err) => {
        this._toastr.showToastr('error', 'Error trying to login');
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;