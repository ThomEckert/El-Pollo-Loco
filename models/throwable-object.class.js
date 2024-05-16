class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  throwableObjects;
  endboss;
  bottle;
  isThrowBottle = false;

  /**
   * Constructor for initializing a SalsaBottle object.
   *
   * @param {number} x - The x-coordinate of the SalsaBottle object.
   * @param {number} y - The y-coordinate of the SalsaBottle object.
   * @return {void}
   */
  constructor(x, y) {
    super().loadImage("./img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.animate();
    this.throw();
  }

  /**
   * A method that simulates throwing a bottle.
   *
   */
  throw() {
    this.isThrowBottle = true;
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      if (this.isAboveGround()) {
        this.x += 10;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 40);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.isAboveGround()) {
        this.explode();
      } else {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 1000 / 10);
  }

  /**
   * Explodes the throwable object by playing the splash animation, stopping its movement,
   * and removing it from the world after a brief delay.
   *
   */
  explode() {
    this.playAnimation(this.IMAGES_SPLASH);
    this.speedY = 0;
    this.speed = 0;
    this.acceleration = 0;
    setTimeout(() => {
      const index = world.throwableObjects.indexOf(this);
      if (index > -1) {
        world.throwableObjects.splice(index, 1);
      }
    }, 150);
  }
}
