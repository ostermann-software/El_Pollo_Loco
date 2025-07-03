class level {
    bottles;
    coins;
    enemies;
    clouds;
    backgroundobjects;
    level_end_x = 719*3;

    
    constructor(bottles, coins, enemies, clouds, backgroundobjects) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundobjects = backgroundobjects;
        this.enemies.forEach(enemy => enemy.level = this);
    }
}