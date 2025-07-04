/**
 * Represents a bottle object that can be drawn on the screen.
 * Inherits from DrawableObject.
 */
class Bottle extends DrawableObject {

    /**
     * Array of image paths for the bottle in different appearances.
     * @type {string[]}
     */
    images_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Creates a new Bottle instance with a random image and position.
     */
    constructor() {
        super();
        let arr = Math.trunc(Math.random() * 2);
        this.loadImage(this.images_bottle[arr]);

        /** @type {number} */
        this.pos_x = (Math.random() * 1000) + 100;

        /** @type {number} */
        this.pos_y = 340;

        /** @type {number} */
        this.height = 70;

        /** @type {number} */
        this.width = 60;
    }
}





