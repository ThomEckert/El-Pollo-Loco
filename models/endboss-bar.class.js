class EndbossBar extends StatusBar {
  IMAGES = [
    "./img/7_statusbars/2_statusbar_endboss/orange/orange0.png", // 0
    "./img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange100.png", //5
  ];
  offset = {
    top: -100,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Constructor function to initialize the object.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 475;
    this.y = 6;
    this.width = 200;
    this.height = 60;
    this.setPercentage(200);
  }

  /**
   * A function to determine the index of the image based on the percentage.
   *
   * @param {type} No parameters.
   * @return {type} The index of the image based on the percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 200) {
      return 5;
    } else if (this.percentage >= 160) {
      return 4;
    } else if (this.percentage >= 120) {
      return 3;
    } else if (this.percentage >= 80) {
      return 2;
    } else if (this.percentage > 5) {
      return 1;
    } else {
      return 0;
    }
  }
}
