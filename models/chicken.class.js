class Chicken extends MovableObject {
  y = 335;
  height = 100;
  width = 60;
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  splash_sound = new Audio("./audio/splash.mp3");
  energy = 10;
  id;
  sounds = [this.splash_sound];

  /**
   * A description of the entire function.
   *
   * @param {type} id - description of parameter
   * @return {type} description of return value
   */
  constructor(id) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.id = id;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 250 + Math.random() * 500 * 3;
    this.speed = 0.15 + Math.random() * 0.25;

    this.animate();
  }

  /**
   * A description of the entire function.
   *
   */
  killChickn() {
    super.killChickn();
    this.splash_sound.play();
  }

  /**
   * A description of the entire function.
   *
   */
  animate() {
    setStoppableInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
    this.moveLeft();
  }
}
