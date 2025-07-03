class BackgroundObject extends MovableObject {

    constructor(imagePath, pos_x) {
        super();
        this.loadImage(imagePath);
        this.width = 720;
        this.height = 480;
        this.pos_x = pos_x;
        this.pos_y = 480 - this.height;
    }
    
}




