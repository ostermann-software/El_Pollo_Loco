/**
 * Represents a collectible coin object that can be drawn on the screen.
 * Inherits from DrawableObject.
 * @extends DrawableObject
 */
class Coin extends DrawableObject {

    /**
     * Creates a new Coin instance with a random position.
     */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.pos_x = (Math.random() * 2000) + 200;
        this.pos_y = (Math.random() * 260) + 80;
        this.height = 120;
        this.width = 120;
    }
}
