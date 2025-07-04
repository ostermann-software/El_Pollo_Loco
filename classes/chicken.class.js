/**
 * Represents a normal chicken enemy that moves and animates.
 * Inherits from MovableObject.
 * @extends MovableObject
 */
class Chicken extends MovableObject {

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /**
     * Image path for the dead chicken.
     * @type {string}
     */
    image_dead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * Creates a new Chicken instance with random position and speed.
     */
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

    /**
     * Starts the movement and animation intervals for the chicken.
     */
    animate() {
        /** @type {number} */
        this.speed = 0.2 + Math.random() * 0.8;

        /** @type {number} */
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 50);

        /** @type {number} */
        this.animInterval = setInterval(() => {
            this.playAnimation(this.images_walking);
        }, 200);
    }

    /**
     * Handles the death of the chicken: stops movement & animation, changes image.
     */
    die() {
        this.loadImage(this.image_dead);
        clearInterval(this.moveInterval);
        clearInterval(this.animInterval);
        this.speed = 0;
        this.dead = true;
    }
}
