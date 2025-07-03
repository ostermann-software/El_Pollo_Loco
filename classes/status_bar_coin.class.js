class StatusBarCoin extends DrawableObject {

    images_coin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.images_coin);
        this.pos_x = 0;
        this.pos_y = 60;
        this.width = 200;
        this.height = 30;
        this.setPercentage(this.percentage);
    }

    
    setPercentage(percentage) {
        let para = Math.trunc(percentage/2);
        let path = this.images_coin[para];
        this.img = this.imageCache[path];
    }
}




