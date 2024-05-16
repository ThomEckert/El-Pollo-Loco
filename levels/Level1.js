let level1;
function initlevel() {
  level1 = new Level(
    [
      new Chicken(0),
      new Chicken(1),
      new Chicken(2),
      new Chicken(3),
      new Chicken(4),
      new Chicken(5),

      new LittleChicken(6),
      new LittleChicken(7),
      new LittleChicken(8),
      new LittleChicken(9),
      new LittleChicken(10),
      new LittleChicken(11),
      new LittleChicken(12),
      new LittleChicken(13),
      new LittleChicken(14),
      new LittleChicken(15),
    ],
    [new Endboss()],
    [new Cloud()],
    [
      new BackgroundObjects("img/5_background/layers/air.png", -719 * 1),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", -719 * 1),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", -719 * 1),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", -719 * 1),

      new BackgroundObjects("img/5_background/layers/air.png", 0),
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObjects("img/5_background/layers/air.png", 719),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObjects("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObjects( "img/5_background/layers/1_first_layer/1.png", 719 * 2),

      new BackgroundObjects("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 3),
    ],
    [
      new Coin(), // 10 coins
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],
    [
      new Bottle(), // 10 bottles
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ]
  );
}
