class CoinBar extends StatusBar {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png", //0
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png", //5
  ];
  amount = 0;

  /**
   * Constructor function to initialize the object with default values and load images.
   *
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 15;
    this.y = 45;
    this.width = 200;
    this.height = 60;
    this.setAmount();
  }

  /**
   * A function to determine the index of the image based on the amount.
   *
   * @param {type} No parameters.
   * @return {type} The index of the image based on the amount.
   */
  resolveImageIndex() {
    if (this.amount == 10) {
      return 5;
    } else if (this.amount >= 8) {
      return 4;
    } else if (this.amount >= 6) {
      return 3;
    } else if (this.amount >= 4) {
      return 2;
    } else if (this.amount >= 2) {
      return 1;
    } else {
      return 0;
    }
  }
}
