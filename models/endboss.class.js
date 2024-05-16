class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  energy = 220;
  characterContact = false;
  speed = 35;
  endbossIsDead = false;
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  endboss_hurt_sound = new Audio("./audio/boss_crow.mp3");
  offset = {
    top: 70,
    bottom: 30,
    left: 40,
    right: 40,
  };
  sounds = [this.endboss_hurt_sound];

  /**
   * Constructor function to initialize the enemy boss chicken.
   */
  constructor() {
    super().loadImage("./img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 719 * 3 + 100;
    this.animate();
  }

  /**
   * Animate function that sets a stoppable interval to call playEndoss every 1/10th of a second.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  animate() {
    setStoppableInterval(() => this.playEndoss(), 1000 / 10);
  }

  /**
   * A function that controls the behavior of the endboss character during gameplay.
   */
  playEndoss() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.endbossIsDead = true;
    } else if (world.character.isHurt()) {
      this.speed = 15;
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.speed = 15;
      this.moveLeft();
      this.endboss_hurt_sound.play();
    } else if (this.x - world.character.x <= 500) {
      this.playAnimation(this.IMAGES_WALKING);
      this.speed = 30;
      this.moveLeft();
    } else {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }
}
