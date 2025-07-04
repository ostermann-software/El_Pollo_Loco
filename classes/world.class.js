/**
 * The main World class that manages the game world, rendering, collision checks, and game logic.
 */
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

    /**
     * Creates the world instance, initializes sounds, starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
     * @param {Keyboard} keyboard - The keyboard handler instance.
     */
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

    /**
     * Sets the reference of this world in the character and starts the background music.
     */
    setWorld() {
        this.character.world = this;
        this.playSound(this.soundBack, true);
    }

    /**
     * Starts the main game loop that periodically updates the world state.
     */
    run() {
        setInterval(() => {
            this.character.wasAboveGround();
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkGameOver();
        }, 100);
    }

    /**
     * Checks if the character can throw an object and initiates throwing.
     */
    checkThrowObjects() {
        if (this.keyboard.d && this.bottleCount >= 1 && this.canThrow) {
            this.canThrow = false;
            this.playSound(this.soundThrow, true);
            let bottle = new ThrowableObject(this.character.pos_x + 50, this.character.pos_y + 50);
            this.throwableObjects.push(bottle);
            this.bottleCount -= 1;
            this.statusBarBottle.setPercentage(this.bottleCount);
            this.checkCanThrow();
        }
    }

    /**
     * Sets a timeout after which the character can throw another bottle.
     */
    checkCanThrow() {
        setTimeout(() => {
            this.canThrow = true;
        }, this.level.enemies > 1 ? 1000 : 400);
    }

    /**
     * Checks all collision types in the world.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.removeDeadEnemies();
        this.checkBottleCollisions();
        this.checkCoinCollisions();
        this.checkBottlePickup();
    }

    /**
     * Checks collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.level.enemies[i];
            const thisIsEndboss = enemy instanceof Endboss;
            const thisIsSmal = enemy instanceof ChickenSmall;
            this.handleCharacterEnemyCollision(enemy, thisIsEndboss, thisIsSmal);
            enemy.enemyDead();
        }
    }

    /**
     * Handles the collision response between the character and an enemy.
     * @param {Enemy} enemy - The enemy to check collision with.
     * @param {boolean} thisIsEndboss - True if the enemy is an Endboss.
     * @param {boolean} thisIsSmal - True if the enemy is a small chicken.
     */
    handleCharacterEnemyCollision(enemy, thisIsEndboss, thisIsSmal) {
        if (this.character.isColliding(enemy, 'enemy') && !enemy.dead) {
            if (thisIsEndboss) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            } else if (!this.character.wasAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            } else {
                this.playSound(this.soundChickenDead, true);
                enemy.die();
                this.character.jump(thisIsSmal ? 20 : 30);
            }
        }
    }

    /**
     * Removes dead enemies from the level.
     */
    removeDeadEnemies() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            if (this.level.enemies[i].delete) {
                this.level.enemies.splice(i, 1);
            }
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle, index) => {
            if (bottle.pos_y > 350) this.throwableObjects.splice(index, 1);
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                this.handleBottleEnemyCollision(index, bottle, i);
            }
        });
    }

    /**
     * Handles collision between a bottle and an enemy.
     * @param {number} index - The index of the bottle in the throwable objects array.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {number} i - The index of the enemy in the enemies array.
     */
    handleBottleEnemyCollision(index, bottle, i) {
        const enemy = this.level.enemies[i];
        const thisIsEndboss = enemy instanceof Endboss;
        if (enemy.isColliding(bottle, 'bottle') && !enemy.dead && !thisIsEndboss) {
            this.throwableObjects.splice(index, 1);
            this.playSound(this.soundChickenDead, true);
            enemy.die();
        }
        if (thisIsEndboss && enemy.isColliding(bottle, 'bottle')) {
            enemy.hitBottle(i);
            this.throwableObjects.splice(index, 1);
            this.playSound(enemy.energy >= 5 ? this.soundChickenDead : this.soundEndbossDead, true);
        }
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCoinCollisions() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];
            if (this.character.isColliding(coin, 'coin')) {
                this.soundCoin.currentTime = 0;
                this.playSound(this.soundCoin, true);
                this.level.coins.splice(i, 1);
                this.coinCount++;
                this.statusBarCoin.setPercentage(this.coinCount);
            }
        }
    }

    /**
     * Checks for collisions between the character and collectible bottles.
     */
    checkBottlePickup() {
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            const bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle, 'bottle')) {
                this.soundBottle.currentTime = 0;
                this.playSound(this.soundBottle, true);
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
                this.statusBarBottle.setPercentage(this.bottleCount);
            }
        }
    }

    /**
     * The main rendering function, draws all objects on the canvas.
     */
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

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds multiple objects to the canvas.
     * @param {MovableObject[]} objects - Array of movable objects.
     */
    addObjectToMap(objects) {
        objects.forEach(mo => this.adToMap(mo));
    }

    /**
     * Draws a single object on the canvas, handling flipped images.
     * @param {MovableObject} mo - The movable object.
     */
    adToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Flips the context to draw mirrored images.
     * @param {MovableObject} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.pos_x = mo.pos_x * -1;
    }

    /**
     * Restores flipped image drawing context.
     * @param {MovableObject} mo 
     */
    flipImageBack(mo) {
        mo.pos_x = mo.pos_x * -1;
        this.ctx.restore();
    }

    /**
     * Draws the health bar above the endboss.
     */
    drawEndbossHealthBar() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;

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

    /**
     * Checks for game over conditions and triggers end screens.
     */
    checkGameOver() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (this.character.isDead() && !this.gameOverAlreadyTriggered) {
            this.gameOverAlreadyTriggered = true;
            setTimeout(() => showGameOverScreen(false), 2000);
        } else if (endboss && endboss.isDead() && !this.gameOverAlreadyTriggered) {
            if (endboss.currentImage < endboss.images_dead.length) return;
            this.gameOverAlreadyTriggered = true;
            setTimeout(() => showGameOverScreen(true), 1000);
        }
    }

    /**
     * Plays a given sound if the game is not muted.
     * @param {HTMLAudioElement} sound - The sound to play.
     * @param {boolean} begin - If true, restarts the sound from the beginning.
     */
    playSound(sound, begin) {
        if (!isMuted) {
            if (begin) sound.currentTime = 0;
            sound.play();
        }
    }
}
