/**
 * Represents a generic health status bar, displaying the health percentage as an image.
 * Inherits from DrawableObject.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    /**
     * Array of image paths representing different health levels.
     * @type {string[]}
     */
    images_health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * The current health percentage displayed by the status bar (0-100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new StatusBar instance, initializes images and position.
     */
    constructor() {
        super();
        this.loadImages(this.images_health);

        /** @type {number} */
        this.pos_x = 0;

        /** @type {number} */
        this.pos_y = 0;

        /** @type {number} */
        this.width = 200;

        /** @type {number} */
        this.height = 30;

        this.setPercentage(this.percentage);
    }

    /**
     * Updates the displayed health percentage and the corresponding image.
     * @param {number} percentage - Health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_health[Math.trunc(percentage / 20)];
        this.img = this.imageCache[path];
    }
}
