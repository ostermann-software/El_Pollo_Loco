/**
 * Represents a status bar for bottles, showing the fill level as an image.
 * Inherits from DrawableObject.
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {

    /**
     * Array of image paths representing different bottle fill levels.
     * @type {string[]}
     */
    images_bottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /**
     * The current bottle percentage shown in the status bar (0 - 100).
     * @type {number}
     */
    percentage = 0;

    /**
     * Creates a new StatusBarBottle instance and initializes its position and images.
     */
    constructor() {
        super();
        this.loadImages(this.images_bottle);
        this.pos_x = 0;
        this.pos_y = 30;
        this.width = 200;
        this.height = 30;
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the current percentage and updates the image shown in the status bar.
     * @param {number} percentage - The percentage (0-100) to display.
     */
    setPercentage(percentage) {
        let para = Math.trunc(percentage / 4);
        let path = this.images_bottle[para];
        this.img = this.imageCache[path];
    }
}
