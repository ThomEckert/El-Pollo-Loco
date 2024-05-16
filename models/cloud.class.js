class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  /**
   * Constructor for initializing a cloud object with a specific image and random positions.
   */
  constructor() {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Function that animates moving left.
   */
  animate() {
    this.moveLeft();
  }
}
