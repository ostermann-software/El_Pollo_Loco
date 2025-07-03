class Character extends MovableObject {

    speed = 20;
    speedY = this.speedY;
    hurt = this.hurt;
    sleeping = false;
    timeAction = 0;
    jumpEnemy = false;
    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
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
    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    images_hurting = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
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
    currentImage = 0;
    world;


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


    animate() {
        setInterval(() => {
            if (this.pos_y > 229) {
                this.pos_y = 235;
            }
            if (this.isDead()) {
            }
            else {
                if (keyboard.right && this.pos_x < this.world.level.level_end_x) {
                    this.moveRight();
                }
                if (keyboard.left && this.pos_x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if (keyboard.space && !this.isAboveGround()) {
                    world.playSound(world.soundJump, true);
                    this.jump(40);
                }
            }
            this.world.camera_x = -this.pos_x + 100;
        }, 100);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.images_dead);
            }
            else if (this.isHurt()) {
                world.playSound(world.soundHurt, false);
                this.playAnimation(this.images_hurting);
                this.timeAction = 0;
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.images_jumping);
                this.timeAction = 0;
            } else if (keyboard.right || keyboard.left) {
                this.playAnimation(this.images_walking);
                this.timeAction = 0;
            } else if (!this.sleeping) {
                this.playAnimation(this.images_idle);
                this.timeAction += 1;
            } else {
                this.playAnimation(this.images_long_idle);
            }
            if (this.timeAction > 50) {
                this.sleeping = true;
            } else {
                this.sleeping = false;
            }
        }, 100);
    }

}


