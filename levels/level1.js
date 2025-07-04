/**
 * Creates level 1 of the game with predefined entities.
 *
 * @returns {level} The initialized level object containing all game entities.
 */
function createLevel1() {
    return new level(
        [
            // Bottles scattered in the level
            new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
            new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
            new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
            new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),
        ],
        [
            // Coins to collect
            new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),
            new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),
        ],
        [
            // Enemies in the level
            new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(),
            new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new Endboss()
        ],
        [
            // Clouds in the sky
            new Cloud()
        ],
        [
            // Background layers to create parallax effect
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ]
    );
}
