

class homeSliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [{ image: 'images/vlcf.jpg', text: "Uros Racic Renueva hasta 2024.", id: 0 },
        { image: 'images/hamilton.jpg', text: "Hamilton consigue una pole más.", id: 1 }
            , { image: 'images/suarez_atm.jpg', text: "Suarez ya brilla con el Atletico", id: 2 }];

    }//end_constructor
}//end_class

let homeSlider = {
    bindings:{
        

    },
    controller: homeSliderCtrl,
    templateUrl: 'components/slider-helpers/homeSlider.html'
};

export default homeSlider;

