class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.pos_x = x;
        this.pos_y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
    }
 
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.pos_x += 13;
        }, 50);
    }
}




