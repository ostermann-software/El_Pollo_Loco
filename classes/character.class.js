/**
 * Represents the main character controlled by the player.
 * Extends MovableObject with movement, animations, and state handling.
 * @extends MovableObject
 */
class Character extends MovableObject {

    /** @type {number} Horizontal movement speed */
    speed = 20;

    /** @type {number} Vertical speed, e.g. for jumps */
    speedY = this.speedY;

    /** @type {boolean} Whether the character is hurt */
    hurt = this.hurt;

    /** @type {boolean} Whether the character is sleeping (idle for long) */
    sleeping = false;

    /** 
     * Time steps without any action.
     * Used to trigger sleeping animation.
     * @type {number} 
     */
    timeNoAction = 0;

    /** @type {boolean} Whether the character jumped on an enemy */
    jumpEnemy = false;

    /** @type {string[]} Paths to walking animation images */
    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} Paths to jumping animation images */
    images_jumping = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
    ];

    /** @type {string[]} Paths to dead animation images */
    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /** @type {string[]} Paths to hurting animation images */
    images_hurting = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /** @type {string[]} Paths to idle animation images */
    images_idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /** @type {string[]} Paths to long idle animation images (sleeping) */
    images_long_idle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /** @type {number} Index of the current animation image */
    currentImage = 0;

    /** @type {object} Reference to the game world the character is in */
    world;

    /**
     * Creates a new character instance, loads images, sets position, starts gravity and animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.pos_x = 0;
        this.pos_y = 130;
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurting);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_long_idle);
        this.applyGravity();
        this.animate();
    }

    /**
     * Main animation loop, called repeatedly every 100ms.
     * Handles checking position, moving character, camera updates and animation state.
     */
    animate() {
        setInterval(() => {
            this.checkY();
            this.moveCharacter();
            this.world.camera_x = -this.pos_x + 100;
            this.casesCharacter();
            this.noAction();
        }, 100);
    }

    /**
     * Ensures the character does not fall below a certain Y coordinate.
     */
    checkY() {
        if (this.pos_y > 229) {
            this.pos_y = 235;
        }
    }

    /**
     * Handles character movement based on keyboard input and game state.
     */
    moveCharacter() {
        if (!this.isDead()) {
            if (keyboard.right && this.pos_x < this.world.level.level_end_x) {
                this.moveRight();
            }
            if (keyboard.left && this.pos_x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (keyboard.space && !this.isAboveGround()) {
                this.world.playSound(this.world.soundJump, true);
                this.jump(40);
            }
        }
    }

    /**
     * Updates the character animation based on current state (dead, hurt, jumping, walking, idle, sleeping).
     */
    casesCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.images_dead);
        } else if (this.isHurt()) {
            this.world.playSound(this.world.soundHurt, false);
            this.playAnimation(this.images_hurting);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.images_jumping);
        } else if (keyboard.right || keyboard.left) {
            this.playAnimation(this.images_walking);
        } else if (!this.sleeping) {
            this.playAnimation(this.images_idle);
        } else {
            this.playAnimation(this.images_long_idle);
        }
    }

    /**
     * Tracks time without player input and switches to sleeping animation after inactivity.
     */
    noAction() {
        this.timeNoAction += 1;
        if (this.isHurt() || this.isAboveGround() || keyboard.right || keyboard.left || keyboard.d) {
            this.timeNoAction = 0;
        }
        this.sleeping = this.timeNoAction > 50;
    }
}
