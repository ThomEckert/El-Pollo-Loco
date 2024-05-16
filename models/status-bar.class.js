class StatusBar extends DrawableObject {
  percentage = 100;

  /**
   * Constructor for creating a new instance.
   */
  constructor() {
    super();
  }

  /**
   * Set the percentage and update the image accordingly.
   *
   * @param {number} percentage - The new percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the amount based on the percentage provided, updates the image path, and caches the image.
   *
   * @param {type} percentage - The new percentage value.
   * @return {type} No return value.
   */
  setAmount(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
