

class MovableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 5;
    energy = 100;
    lastHit = 0;
    dead = false;
    dead_old = false;
    deadTime = 0;
    delete = false;
    aboutGroundTime = 0;

    moveRight() {
        this.pos_x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.pos_x -= this.speed;
    }

    moveLeftRepeat() {
        this.pos_x -= this.speed;
        setInterval(() => {
            this.pos_x -= this.speed;
            if (this.pos_x + this.width + 30 < world.character.pos_x) {
                this.pos_x = world.character.pos_x + 600;
            }
        }, 50);
    }

    jump(para) {
        this.currentImage = 0;
        this.speedY = para;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.pos_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 100);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.pos_y < 230;
        }
    }

    wasAboveGround() {
        if (this.pos_y < 220 && this.speedY < 0) {
            this.aboutGroundTime = 3;
        } else {
            this.aboutGroundTime -= 1;
            if (this.aboutGroundTime < 0) {
                this.aboutGroundTime = 0;
            }
        }
        return this.aboutGroundTime !== 0;
    }

    isColliding(mo) {
        let this_off_pos_x = 16;
        let this_off_pos_y = 75;
        let this_off_width = - 30;
        let this_off_height = - 85;
        if (this instanceof Chicken) {
            this_off_pos_x = 0;
            this_off_pos_y = 0; //47
            this_off_width = 0;
            this_off_height = 0; //-95
        }
        else if (this instanceof ChickenSmall) {
            this_off_pos_x = 2;
            this_off_pos_y = 2;
            this_off_width = - 5;
            this_off_height = - 5;
        } else if (this instanceof Endboss) {
            this_off_pos_x = 0;
            this_off_pos_y = 0;
            this_off_width = 0;
            this_off_height = 0;
        }
        let mo_off_pos_x = 16;
        let mo_off_pos_y = 75;
        let mo_off_width = - 30;
        let mo_off_height = - 85;
        if (mo instanceof Chicken) {
            mo_off_pos_x = 0;
            mo_off_pos_y = 0;
            mo_off_width = 0;
            mo_off_height = 0;
        }
        else if (mo instanceof ChickenSmall) {
            mo_off_pos_x = 2;
            mo_off_pos_y = 2;
            mo_off_width = - 5;
            mo_off_height = - 5;
        } else if (mo instanceof Endboss) {
            mo_off_pos_x = 0;
            mo_off_pos_y = 0;
            mo_off_width = 0;
            mo_off_height = 0;
        } else if (mo instanceof Coin) {
            mo_off_pos_x = 40;
            mo_off_pos_y = 40;
            mo_off_width = - 80;
            mo_off_height = - 80;
        } else if (mo instanceof Bottle) {
            mo_off_pos_x = 0;
            mo_off_pos_y = 0;
            mo_off_width = - 0;
            mo_off_height = - 0;
        }
        return this.pos_x + this_off_pos_x + this.width + this_off_width > mo.pos_x + mo_off_pos_x &&
            this.pos_y + this_off_pos_y + this.height + this_off_height > mo.pos_y + mo_off_pos_y &&
            this.pos_x + this_off_pos_x < mo.pos_x + mo_off_pos_x + mo.width + mo_off_width &&
            this.pos_y + this_off_pos_y < mo.pos_y + mo_off_pos_y + mo.height + mo_off_height;
    }

    isColliding2(mo, test) {
        let this_off_pos_x = 16;
        let this_off_pos_y = 75;
        let this_off_width = - 30;
        let this_off_height = - 85;
        if (this instanceof Chicken) {
            this_off_pos_x = 0;
            this_off_pos_y = 0; //47
            this_off_width = 0;
            this_off_height = 0; //-95
        }
        else if (this instanceof ChickenSmall) {
            this_off_pos_x = 2;
            this_off_pos_y = 2;
            this_off_width = - 5;
            this_off_height = - 5;
        } else if (this instanceof Endboss) {
            this_off_pos_x = 0;
            this_off_pos_y = 0;
            this_off_width = 0;
            this_off_height = 0;
        }
        let mo_off_pos_x = 16;
        let mo_off_pos_y = 75;
        let mo_off_width = - 30;
        let mo_off_height = - 85;
        if (test == 'enemy') {
            mo_off_pos_x = 0;
            mo_off_pos_y = 0;
            mo_off_width = 0;
            mo_off_height = 0;
        } else if (test == 'coin') {
            mo_off_pos_x = 40;
            mo_off_pos_y = 40;
            mo_off_width = - 80;
            mo_off_height = - 80;
        }
        if (test == 'bottle') {
            mo_off_pos_x = 15;
            mo_off_pos_y = 10;
            mo_off_width = -30;
            mo_off_height = -20;
        }
        return this.pos_x + this_off_pos_x + this.width + this_off_width > mo.pos_x + mo_off_pos_x &&
            this.pos_y + this_off_pos_y + this.height + this_off_height > mo.pos_y + mo_off_pos_y &&
            this.pos_x + this_off_pos_x < mo.pos_x + mo_off_pos_x + mo.width + mo_off_width &&
            this.pos_y + this_off_pos_y < mo.pos_y + mo_off_pos_y + mo.height + mo_off_height;
    }

    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitBottle() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.6;
    }

    isDead() {
        if (this.energy <= 0 && !this.isHurt()) {
            this.dead = true;
            return this.energy <= 0 && !this.isHurt();
        }
    }

    enemyDead() {
        if (this.dead) {
            this.deadTime += 1;
            if (this.deadTime > 10) {
                this.delete = true;
            }
        }
    }

}




