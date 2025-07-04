/**
 * Represents a background object that can move.
 * Inherits from MovableObject.
 */
class BackgroundObject extends MovableObject {

    /**
     * Creates a new BackgroundObject.
     * @param {string} imagePath - The path to the image file.
     * @param {number} pos_x - The x position of the background object.
     */
    constructor(imagePath, pos_x) {
        super();
        this.loadImage(imagePath);
        /** @type {number} */
        this.width = 720;
        /** @type {number} */
        this.height = 480;
        /** @type {number} */
        this.pos_x = pos_x;
        /** @type {number} */
        this.pos_y = 480 - this.height;
    }
}





