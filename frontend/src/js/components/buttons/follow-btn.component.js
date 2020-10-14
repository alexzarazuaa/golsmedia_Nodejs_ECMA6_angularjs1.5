class FollowBtnCtrl {
    constructor(Profile, User, $state) {
        'ngInject';

        this._Profile = Profile;
        this._User = User;
        this._$state = $state;

        this.$onInit = () => {
            if (User.current) {
              this.canModify = (User.current.username === this.user.username);
            } else {
              this.canModify = false;
            }
          }
        
    }//end_constructor

    submit() {
        this.isSubmitting = true;

        //if user is not registered 
        if (!this._User.current) {
            this._$state.go('app.register')
        }

        if (this.user.following) {
            this._Profile.unfollow(this.user.username).then(
                () => {
                    this.isSubmitting = false;
                    this.user.following = false;
                }

            )
        }
        // follow them
        else {
            this._Profile.follow(this.user.username).then(
                () => {
                    this.isSubmitting = false;
                    this.user.following = true;
                }
            )
        }


    }
}

let FollowBtn = {
    bindings: {
        user: '='
    },
    controller: FollowBtnCtrl,
    templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;