class OpinionsListCtrl {
    constructor(Opinions) {
        "ngInject";
        console.log('---- OPINIONS LIST ----');

        this._Opinions = Opinions;
  
        this.$onInit = () => {
            this._Opinions.query().then(res => {
                console.log('OPINIONESSS------->', res.opinions);
                console.log(res.opinions)
                this.opinions = res.opinions;
            })
        }
    }

    
}//End__OpinionsListCtrl

let OpinionList = {
    controller: OpinionsListCtrl,
    templateUrl: 'components/opinions-helpers/opinion-list.html'

}// End__OpinionList

export default OpinionList;