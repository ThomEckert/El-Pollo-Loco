class Level {
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x = 719 * 3;

  /**
   * Constructor for initializing a game scene with various elements.
   *
   * @param {type} enemies - description of parameter
   * @param {type} endboss - description of parameter
   * @param {type} clouds - description of parameter
   * @param {type} backgroundObjects - description of parameter
   * @param {type} coins - description of parameter
   * @param {type} bottles - description of parameter
   * @return {type} description of return value
   */
  constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
