/**
 * Represents the end boss health status bar, showing health percentage as an image.
 * Inherits from DrawableObject.
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {

    images_health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percentage = 100;

    /**
     * Creates a new StatusBarEndboss instance and initializes position and images.
     */
    constructor() {
        super();
        this.loadImages(this.images_health);
        this.pos_x = 0;
        this.pos_y = 90;
        this.width = 200;
        this.height = 30;
        this.setPercentage(this.percentage);
    }

    /**
     * Updates the health percentage and sets the corresponding image.
     * @param {number} percentage - The health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_health[Math.trunc(percentage / 20)];
        this.img = this.imageCache[path];
    }
}
