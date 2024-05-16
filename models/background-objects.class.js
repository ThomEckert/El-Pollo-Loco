class BackgroundObjects extends MovableObject {
  width = 720;
  height = 480;

  /**
   * A description of the entire function.
   *
   * @param {type} imagePath - description of parameter
   * @param {type} x - description of parameter
   * @return {type} description of return value
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
