class Endboss extends MovableObject {

    speed = 20;
    attack = false;
    images_walk = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    images_alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    images_attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    images_hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    images_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super();
        this.loadImage(this.images_walk[0]);
        this.pos_x = 2500;
        this.pos_y = 230;
        this.height = 200;
        this.width = 200;
        this.energy = 100;

        this.loadImages(this.images_walk);
        this.loadImages(this.images_alert);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.animate();
    }


    animate() {
        if (!(this instanceof Endboss)) return;
        this.animInterval = setInterval(() => {
            if (this.energy < 95) {
                this.attack = true;
            }
            if (this.dead) {
                if (!this.dead_old) {
                    this.currentImage = 0;
                    this.dead_old = true;
                }
                if (this.currentImage < this.images_dead.length) {
                    this.playAnimation(this.images_dead);
                } else {
                    let i = this.level.enemies.indexOf(this);
                    this.level.enemies.splice(i, 1);
                    clearInterval(this.animInterval);
                    return;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);
            } else if (this.attack) {
                this.playAnimation(this.images_walk);
                this.moveLeft();
            } else {
                this.playAnimation(this.images_alert);
            }
        }, 200);
    }

    
    die(index) {
        this.loadImage(this.images_dead[0]);
        clearInterval(this.moveInterval);
        clearInterval(this.animInterval);
        this.speed = 0;

        setTimeout(() => {
            this.loadImage(this.images_dead[1]);
        }, 200);
        setTimeout(() => {
            this.loadImage(this.images_dead[2]);
        }, 400);

        setTimeout(() => {
            if (this.level && this.level.enemies) {
                this.level.enemies.splice(index, 1);
            }
        }, 3000);
    }

}