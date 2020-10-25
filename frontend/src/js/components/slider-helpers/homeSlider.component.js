

class homeSliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [{ image: 'images/nba.jpg', text: "NBA.", id: 0 },
        { image: 'images/ELClasico.jpg', text: "El Clásico lo gana el Real Madrid.", id: 1 }
            , { image: 'images/maxiVlfc.jpg', text: "Reducción del valor de la plantilla", id: 2 }];

    }//end_constructor
}//end_class

let homeSlider = {
    bindings:{
        

    },
    controller: homeSliderCtrl,
    templateUrl: 'components/slider-helpers/homeSlider.html'
};

export default homeSlider;

