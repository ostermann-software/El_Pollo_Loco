/**
 * Represents a game level, containing all objects like bottles, coins, enemies, clouds, and background elements.
 */
class level {

    /**
     * Collection of bottles in the level.
     * @type {Bottle[]}
     */
    bottles;

    /**
     * Collection of coins in the level.
     * @type {Coin[]}
     */
    coins;

    /**
     * Collection of enemies in the level.
     * @type {MovableObject[]}
     */
    enemies;

    /**
     * Collection of clouds in the level.
     * @type {Cloud[]}
     */
    clouds;

    /**
     * Collection of background objects in the level.
     * @type {BackgroundObject[]}
     */
    backgroundobjects;

    /**
     * The x position where the level ends.
     * @type {number}
     */
    level_end_x = 719 * 3;

    /**
     * Creates a new level instance.
     * @param {Bottle[]} bottles - The bottles in the level.
     * @param {Coin[]} coins - The coins in the level.
     * @param {MovableObject[]} enemies - The enemies in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {BackgroundObject[]} backgroundobjects - The background objects in the level.
     */
    constructor(bottles, coins, enemies, clouds, backgroundobjects) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundobjects = backgroundobjects;

        this.enemies.forEach(enemy => enemy.level = this);
    }
}
