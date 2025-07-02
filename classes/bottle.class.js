class Bottle extends DrawableObject {

    images_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super();
        let arr = Math.trunc(Math.random()*2);
        this.loadImage(this.images_bottle[arr]);
        this.pos_x = (Math.random() * 1000) + 100;
        this.pos_y = 340;
        this.height = 70;
        this.width = 60;

    }

}




