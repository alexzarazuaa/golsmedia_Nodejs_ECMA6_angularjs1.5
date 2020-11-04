class OpinionsCtrl {
  constructor(Opinions) {
    'ngInject';

    console.log('esta en el ctrl de opinions');
    this.opinions = Opinions;
    console.log(Opinions)


  }
}


export default OpinionsCtrl;