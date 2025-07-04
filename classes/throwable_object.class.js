/**
 * Represents an object that can be thrown, like a bottle.
 * Inherits from MovableObject.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /**
     * Creates a new throwable object at the specified position.
     * @param {number} x - The initial x position.
     * @param {number} y - The initial y position.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.pos_x = x;
        this.pos_y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    /**
     * Initiates the throw animation by setting vertical speed,
     * applying gravity, and moving horizontally at intervals.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.pos_x += 13;
        }, 50);
    }
}
