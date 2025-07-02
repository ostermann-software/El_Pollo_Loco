

class World {
    character = new Character();
    level = createLevel1();
    canvas;
    keyboard;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBar = new StatusBar();
    throwableObjects = [];
    bottleCount = 0;
    coinCount = 0;
    gameOverAlreadyTriggered = false;
    soundBack = new Audio('audio/backgroundSound.mp3');
    soundChicken = new Audio('audio/chicken.mp3');
    soundBottle = new Audio('audio/bottle.mp3');
    soundCoin = new Audio('audio/coin.mp3');
    soundSmash = new Audio('audio/smash.mp3');
    soundHurt = new Audio('audio/hurt.mp3');
    soundJump = new Audio('audio/jump.mp3');
    soundThrow = new Audio('audio/throw.mp3');
    soundChickenDead = new Audio('audio/chickenDead.mp3');
    soundEndbossDead = new Audio('audio/endbossDead.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.canThrow = true;
        this.soundBack.volume = 1.0;
        this.soundChicken.volume = 0.3;
        this.soundBottle.volume = 0.1;
        this.soundCoin.volume = 0.1;
        this.soundSmash.volume = 0.1;
        this.soundHurt.volume = 0.1;
        this.soundJump.volume = 0.02;
        this.soundThrow.volume = 0.1;
        this.soundChickenDead.volume = 0.3;
        this.soundEndbossDead.volume = 0.4;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.playSound(this.soundBack, true);
    }

    run() {
        setInterval(() => {
            this.character.wasAboveGround();
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkGameOver();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.d && this.bottleCount >= 1 && this.canThrow) {
            world.character.timeAction = 0;
            this.canThrow = false;
            this.playSound(this.soundThrow, true)
            let bottle = new ThrowableObject(this.character.pos_x + 50, this.character.pos_y + 50);
            this.throwableObjects.push(bottle);
            this.bottleCount -= 1;
            this.statusBarBottle.setPercentage(this.bottleCount);
            if (this.level.enemies > 1) {
                setTimeout(() => {
                    this.canThrow = true;
                }, 1000);
            } else {
                setTimeout(() => {
                    this.canThrow = true;
                }, 400);
            }
        }
    }

    checkCollisions() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.level.enemies[i];
            const thisIsEndboss = this.level.enemies[i] instanceof Endboss;
            const thisIsSmal = this.level.enemies[i] instanceof ChickenSmall;
            if (this.character.isColliding2(enemy, 'enemy') && !enemy.dead) {
                if (thisIsEndboss) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                } else {
                    if (!this.character.wasAboveGround()) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    } else {
                        this.playSound(this.soundChickenDead, true);
                        enemy.die(i);
                        if (thisIsSmal) {
                            this.character.jump(20);
                        } else {
                            this.character.jump(30);
                        }
                    }
                }
            }
            enemy.enemyDead();
        };

        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            if (this.level.enemies[i].delete) {
                this.level.enemies.splice(i, 1);
            }
        }

        this.throwableObjects.forEach(bottle => {
            const index = this.throwableObjects.indexOf(bottle);
            if (bottle.pos_y > 350) {
                this.throwableObjects.splice(index, 1);
            }
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                const enemy = this.level.enemies[i];
                const endboss = this.level.enemies.find(element => element instanceof Endboss);
                const thisIsEndboss = this.level.enemies[i] instanceof Endboss;
                if (enemy.isColliding2(bottle, 'bottle') && !enemy.dead && !thisIsEndboss) {
                    if (index > -1) {
                        this.throwableObjects.splice(index, 1);
                    }
                    this.playSound(this.soundChickenDead, true);
                    enemy.die(i);
                }
                if (endboss && thisIsEndboss) {
                    if (endboss.isColliding2(bottle, 'bottle')) {
                        endboss.hitBottle(i);
                        this.throwableObjects.splice(bottle, 1);
                        if (endboss.energy >= 5) {
                            this.playSound(this.soundChickenDead, true);
                        } else {
                            this.playSound(this.soundEndbossDead, true);
                        }
                    }
                }
            }
        });
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];
            if (this.character.isColliding2(coin, 'coin')) {
                this.soundCoin.currentTime = 0;
                this.playSound(this.soundCoin, true);
                this.level.coins.splice(i, 1);
                this.coinCount += 1;
                this.statusBarCoin.setPercentage(this.coinCount);
            }
        };
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            const bottle = this.level.bottles[i];
            if (this.character.isColliding2(bottle, 'bottle')) {
                this.soundBottle.currentTime = 0;
                this.playSound(this.soundBottle, true);
                this.level.bottles.splice(i, 1);
                this.bottleCount += 1;
                this.statusBarBottle.setPercentage(this.bottleCount);
            }
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundobjects);


        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.level.enemies);
        this.drawEndbossHealthBar();
        this.adToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.adToMap(this.statusBar);
        this.adToMap(this.statusBarBottle);
        this.adToMap(this.statusBarCoin);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectToMap(objects) {
        objects.forEach(mo => {
            this.adToMap(mo);
        });
    }

    adToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.pos_x = mo.pos_x * -1;
    }

    flipImageBack(mo) {
        mo.pos_x = mo.pos_x * -1;
        this.ctx.restore();
    }

    drawEndbossHealthBar() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (!endboss) {
            return;
        }
        const barWidth = 100;
        const barHeight = 10;
        const barX = endboss.pos_x;
        const barY = endboss.pos_y;
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(barX, barY, barWidth, barHeight);
        this.ctx.fillStyle = 'green';
        const percent = Math.max(0, endboss.energy) / 100;
        this.ctx.fillRect(barX, barY, barWidth * percent, barHeight);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(barX, barY, barWidth, barHeight);
    }

    checkGameOver() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (this.character.isDead() && !this.gameOverAlreadyTriggered) {
            this.gameOverAlreadyTriggered = true;
            setTimeout(() => {
                showGameOverScreen(false);
            }, 2000);
        }
        if (endboss && endboss.isDead() && !this.gameOverAlreadyTriggered) {
            if (endboss.currentImage < endboss.images_dead.length) {
                return;
            }
            this.gameOverAlreadyTriggered = true;
            setTimeout(() => {
                showGameOverScreen(true);
            }, 1000);
        }
    }

    playSound(sound, begin) {
        if (!isMuted) {
            if (begin) {
                sound.currentTime = 0;
            }
            sound.play();
        }
    }

}




