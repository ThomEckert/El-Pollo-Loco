class Bottle extends CollectableObjects {
  height = 60;
  width = 60;
  y = 375;
  offset = {
    top: 15,
    bottom: 5,
    left: 20,
    right: 10,
  };

  /**
   * Constructor for initializing a salsa bottle object with a specific image and random positions.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  constructor() {
    super();
    this.loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 500 * 2;
    this.y = 375;
  }
}
