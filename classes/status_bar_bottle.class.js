class StatusBarBottle extends DrawableObject {

    images_bottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.images_bottle);
        this.pos_x = 0;
        this.pos_y = 30;
        this.width = 200;
        this.height = 30;
        this.setPercentage(this.percentage);
    }

    
    setPercentage(percentage) {
        let para = Math.trunc(percentage/4);
        let path = this.images_bottle[para];
        this.img = this.imageCache[path];
    }
}




