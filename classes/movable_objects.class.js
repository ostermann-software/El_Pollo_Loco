/**
 * Represents a movable object in the game.
 * Extends DrawableObject to include movement, gravity, collision and damage handling.
 */
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
    this_off_pos_x = 16;
    this_off_pos_y = 75;
    this_off_width = -30;
    this_off_height = -85;
    mo_off_pos_x = 16;
    mo_off_pos_y = 75;
    mo_off_width = -30;
    mo_off_height = -85;


    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.pos_x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.pos_x -= this.speed;
    }

    /**
     * Continuously moves the object to the left.
     * If too far behind the character, resets position forward.
     */
    moveLeftRepeat() {
        this.pos_x -= this.speed;
        setInterval(() => {
            this.pos_x -= this.speed;
            if (this.pos_x + this.width + 30 < world.character.pos_x) {
                this.pos_x = world.character.pos_x + 600;
            }
        }, 50);
    }

    /**
     * Makes the object jump by setting its vertical speed.
     * @param {number} para - The initial jump speed.
     */
    jump(para) {
        this.currentImage = 0;
        this.speedY = para;
    }

    /**
     * Plays an animation by cycling through given image frames.
     * @param {string[]} images - Array of image paths for animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Applies gravity effect by adjusting vertical position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.pos_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 100);
    }

    /**
     * Checks if the object is above the ground level.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.pos_y < 230;
        }
    }

    /**
     * Checks if the object was recently above ground (used to tweak gravity effects).
     * @returns {boolean}
     */
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

    /**
     * Checks if this object is colliding with another object.
     * @param {MovableObject} mo - The other movable object.
     * @param {string} object - Type of the object (used to apply specific offsets).
     * @returns {boolean}
     */
    isColliding(mo, object) {
        this.offsets(object);
        return this.pos_x + this.this_off_pos_x + this.width + this.this_off_width > mo.pos_x + this.mo_off_pos_x &&
            this.pos_y + this.this_off_pos_y + this.height + this.this_off_height > mo.pos_y + this.mo_off_pos_y &&
            this.pos_x + this.this_off_pos_x < mo.pos_x + this.mo_off_pos_x + mo.width + this.mo_off_width &&
            this.pos_y + this.this_off_pos_y < mo.pos_y + this.mo_off_pos_y + mo.height + this.mo_off_height;
    }

    /**
     * Sets the collision offset values depending on object type.
     * @param {string} object - The type of object ('enemy', 'coin', 'bottle').
     */
    offsets(object) {
        if (this instanceof Chicken) {
            this.offsetChicken();
        } else if (this instanceof ChickenSmall) {
            this.offsetChickenSmall();
        } else if (this instanceof Endboss) {
            this.offsetEndboss();
        }
        if (object == 'enemy') {
            this.offsetEnemy();
        } else if (object == 'coin') {
            this.offsetCoin();
        } else if (object == 'bottle') {
            this.offsetBottle();
        }
    }

    /** Sets hitbox offsets for Chicken. */
    offsetChicken() {
        this.this_off_pos_x = 0;
        this.this_off_pos_y = 0;
        this.this_off_width = 0;
        this.this_off_height = 0;
    }

    /** Sets hitbox offsets for ChickenSmall. */
    offsetChickenSmall() {
        this.this_off_pos_x = 2;
        this.this_off_pos_y = 2;
        this.this_off_width = -5;
        this.this_off_height = -5;
    }

    /** Sets hitbox offsets for Endboss. */
    offsetEndboss() {
        this.this_off_pos_x = 0;
        this.this_off_pos_y = 0;
        this.this_off_width = 0;
        this.this_off_height = 0;
    }

    /** Sets target offsets if colliding with an enemy. */
    offsetEnemy() {
        this.mo_off_pos_x = 0;
        this.mo_off_pos_y = 0;
        this.mo_off_width = 0;
        this.mo_off_height = 0;
    }

    /** Sets target offsets if colliding with a coin. */
    offsetCoin() {
        this.mo_off_pos_x = 40;
        this.mo_off_pos_y = 40;
        this.mo_off_width = -80;
        this.mo_off_height = -80;
    }

    /** Sets target offsets if colliding with a bottle. */
    offsetBottle() {
        this.mo_off_pos_x = 15;
        this.mo_off_pos_y = 10;
        this.mo_off_width = -30;
        this.mo_off_height = -20;
    }

    /**
     * Reduces energy by 1 and records last hit timestamp.
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces energy by 10 when hit by a bottle.
     */
    hitBottle() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if object was recently hit (flashing or invulnerable state).
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.6;
    }

    /**
     * Checks if object is dead (no energy left and not recently hurt).
     * @returns {boolean}
     */
    isDead() {
        if (this.energy <= 0 && !this.isHurt()) {
            this.dead = true;
            return true;
        }
        return false;
    }

    /**
     * Counts frames after death, then flags object for deletion.
     */
    enemyDead() {
        if (this.dead) {
            this.deadTime += 1;
            if (this.deadTime > 10) {
                this.delete = true;
            }
        }
    }
}