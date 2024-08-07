class HealthBar extends StatusBar {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png", // 0
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png", //5
  ];
  percentage = 100;

  /**
   * Constructor function to initialize the object.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 15;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * A function to determine the index of the image based on the percentage.
   *
   * @param {type} No parameters.
   * @return {type} The index of the image based on the percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
