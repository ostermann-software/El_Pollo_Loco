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
        this.width = 720;
        this.height = 480;
        this.pos_x = pos_x;
        this.pos_y = 480 - this.height;
    }
}