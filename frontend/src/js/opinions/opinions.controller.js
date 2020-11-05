import opinionsModule from ".";

class OpinionsCtrl {
  constructor(opinion) {
    'ngInject';

    console.log('esta en el ctrl de opinion');
    this.opinion = opinion;

    /**
     * PREGUNTAR EL PORQUE DE opinion.opinion
     */
    console.log('all--------------------',opinion)
    console.log('Ctrl opinion Details -----> ',opinion.opinion.slug)


  }
}


export default OpinionsCtrl;