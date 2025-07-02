class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    pos_x = 100;
    pos_y = 200;
    height = 200;
    width = 100;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"> ...
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.pos_x, this.pos_y, this.width, this.height)
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = '1';
            ctx.rect(this.pos_x + 16, this.pos_y + 75, this.width - 30, this.height - 85);
            ctx.stroke();
        }
        else if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = '1';
            ctx.rect(this.pos_x, this.pos_y + 0, this.width, this.height - 0);
            ctx.stroke();
        }
        else if (this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = '1';
            ctx.rect(this.pos_x + 2, this.pos_y + 2, this.width - 5, this.height - 5);
            ctx.stroke();
        }
        else if (this instanceof Coin) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = '1';
            ctx.rect(this.pos_x + 40, this.pos_y + 40, this.width - 80, this.height - 80);
            ctx.stroke();
        }
        else if (this instanceof Bottle) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = '1';
            ctx.rect(this.pos_x + 15, this.pos_y + 10, this.width - 30, this.height - 20);
            ctx.stroke();
        }
    }

}


