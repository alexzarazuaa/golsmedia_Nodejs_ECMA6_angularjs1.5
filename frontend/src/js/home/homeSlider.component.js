class homeSliderCtrl{
    constructor(){
        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = {image:'/images/vlcf.jpg',text:"Uros Racic Renueva hasta 2025.",id:0},
        {image:'/images/hamilton.jpg',text:"Hamilton consigue una pole más.",id:1}
        ,{image:'frontend/src/images/suarez_atm.jpg',text:"Suarez ya jugará contra el Gran",id:2};

    }

}

let homeSlider = {
    controller : homeSliderCtrl,
    templateUrl : 'home/homeSlider.html'
}


export default homeSlider;