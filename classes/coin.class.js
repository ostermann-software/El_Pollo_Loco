class Coin extends DrawableObject {

    
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.pos_x = (Math.random() * 2000) + 200;
        this.pos_y = (Math.random() * 260) + 80;
        this.height = 120;
        this.width = 120;
    }

}




