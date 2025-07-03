class Chicken extends MovableObject {

    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    image_dead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.pos_x = (Math.random() * 1000) + 800;
        this.pos_y = 380;
        this.height = 50;
        this.width = 50;
        this.loadImages(this.images_walking);
        this.animate();
    }


    animate() {
        this.speed = 0.2 + Math.random() * 0.8;
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 50);
        this.animInterval = setInterval(() => {
            this.playAnimation(this.images_walking);
        }, 200);
    }


    die() {
        this.loadImage(this.image_dead);
        clearInterval(this.moveInterval);
        clearInterval(this.animInterval);
        this.speed = 0;
        this.dead = true;
    }
    
}




