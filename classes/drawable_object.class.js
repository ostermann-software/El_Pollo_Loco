/**
 * Base class for drawable game objects.
 */
class DrawableObject {

    /** @type {HTMLImageElement} The current image to draw */
    img;

    /** @type {Object.<string, HTMLImageElement>} Cache for loaded images keyed by path */
    imageCache = {};

    /** @type {number} Index of the current image in an animation */
    currentImage = 0;

    /** @type {number} X position on the canvas */
    pos_x = 100;

    /** @type {number} Y position on the canvas */
    pos_y = 200;

    /** @type {number} Height of the object */
    height = 200;

    /** @type {number} Width of the object */
    width = 100;

    /**
     * Loads a single image and sets it as the current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image on the canvas context at the object's position and size.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.pos_x, this.pos_y, this.width, this.height);
    }

    /**
     * Loads multiple images into the image cache for animation.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a blue debug frame around the object depending on its specific class.
     * Calls the corresponding drawXYZ method based on instance type.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character) {
            this.drawCharacter(ctx);
        } else if (this instanceof Chicken) {
            this.drawChicken(ctx);
        } else if (this instanceof ChickenSmall) {
            this.drawChickenSmall(ctx);
        } else if (this instanceof Coin) {
            this.drawCoin(ctx);
        } else if (this instanceof Bottle) {
            this.drawBottle(ctx);
        }
    }

    /**
     * Draws a blue rectangle frame around the character for debugging.
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawCharacter(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.rect(this.pos_x + 16, this.pos_y + 75, this.width - 30, this.height - 85);
        ctx.stroke();
    }

    /**
     * Draws a blue rectangle frame around the chicken for debugging.
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawChicken(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.rect(this.pos_x, this.pos_y, this.width, this.height);
        ctx.stroke();
    }

    /**
     * Draws a blue rectangle frame around the small chicken for debugging.
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawChickenSmall(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.rect(this.pos_x + 2, this.pos_y + 2, this.width - 5, this.height - 5);
        ctx.stroke();
    }

    /**
     * Draws a blue rectangle frame around the coin for debugging.
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawCoin(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.rect(this.pos_x + 40, this.pos_y + 40, this.width - 80, this.height - 80);
        ctx.stroke();
    }

    /**
     * Draws a blue rectangle frame around the bottle for debugging.
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawBottle(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.rect(this.pos_x + 15, this.pos_y + 10, this.width - 30, this.height - 20);
        ctx.stroke();
    }
}
