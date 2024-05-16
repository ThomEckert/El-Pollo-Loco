class BottleBar extends StatusBar {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png", //0
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png", //5
  ];
  amount = 0;

  /**
   * Constructor function to initialize the BottleBar object with default values and load images.
   *
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 15;
    this.y = 90;
    this.width = 200;
    this.height = 60;
    this.setAmount();
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  resolveImageIndex() {
    if (this.amount >= 10) {
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
