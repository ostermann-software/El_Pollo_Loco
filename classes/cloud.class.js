/**
 * Represents a cloud object that moves across the screen.
 * Inherits from MovableObject.
 * @extends MovableObject
 */
class Cloud extends MovableObject {

    /**
     * Creates a new Cloud instance with a random x position.
     */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.pos_x = (Math.random() * 100) + 10;
        this.pos_y = 10;
        this.width = 800;
        this.animate();
    }

    /**
     * Starts moving the cloud to the left repeatedly with a constant speed.
     */
    animate() {
        /** @type {number} */
        this.speed = 1.5;
        this.moveLeftRepeat();
    }
}
