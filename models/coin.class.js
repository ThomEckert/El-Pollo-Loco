class Coin extends CollectableObjects {
  height = 60;
  width = 60;
  y = 375;

  /**
   * A description of the entire function.
   *
   */
  constructor() {
    super().loadImage("./img/7_statusbars/3_icons/icon_coin.png");
    this.x = 200 + Math.random() * 500 * 3;
    this.y = 75 + Math.random() * 300;
  }
}
