

class Cloud extends MovableObject {
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.pos_x = (Math.random() * 100) + 10;
        this.pos_y = 10;
        this.width = 800;
        this.animate();
    }

    animate() {
        this.speed = 1.5;
        this.moveLeftRepeat();
    }
}





