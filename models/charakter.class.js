class Character extends MovableObject {
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  offset = {
    top: 120,
    bottom: 30,
    left: 20,
    right: 30,
  };
  height = 280;
  y = 150;
  world;
  speed = 5;
  walking_sound = new Audio("./audio/walk2.mp3");
  jump_sound = new Audio("./audio/jump.mp3");
  hit_sound = new Audio("./audio/hit.mp3");
  dead_sound = new Audio("./audio/hit2.mp3");
  bottle_sound = new Audio("./audio/bottle.mp3");
  sleep_sound = new Audio("./audio/sleep.mp3");
  characterIsDead = false;
  sounds = [
    this.walking_sound,
    this.jump_sound,
    this.hit_sound,
    this.dead_sound,
    this.bottle_sound,
    this.sleep_sound,
  ];

  /**
   * Constructor for initializing an object with various states' images, applying gravity, and starting animation.
   *
   * @return {void} This function does not return anything.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Simulates pressing the left key on the keyboard, indicating the character is moving left,
   * and sets a timeout to release the key after a delay. This method is typically used to simulate
   * the character's movement when they are hurt or need to perform a quick dodge or retreat.
   *
   * @return {void} This function does not return anything.
   */
  moveLeftHurt() {
    keyboard.LEFT = true;
    this.otherDirection = false;
    setTimeout(function () {
      keyboard.LEFT = false;
    }, 1000);
  }

  /**
   * A method that updates the last animation change time, sets stoppable intervals to continuously move the character and play character animations.
   *
   * @return {void} This function does not return anything.
   */
  animate() {
    this.lastAnimationChangeTime = new Date().getTime();
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    setStoppableInterval(() => this.playCharacter(), 1000 / 10);
  }

  /**
   * Plays animations based on the character's state.
   *
   * This method checks various conditions such as whether the character is dead, hurt, above ground, or moving. Depending on these states, it plays the
   * appropriate animation and sound effects. It also handles idle animations and long idle animations with a sleep sound effect.
   */
  playCharacter() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.dead_sound.play();
      this.characterIsDead = true;
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        if (new Date().getTime() - this.lastAnimationChangeTime <= 15000) {
          this.playAnimation(this.IMAGES_IDLE);
        } else {
          this.playAnimation(this.IMAGES_LONG_IDLE);
          this.sleep_sound.play();
        }
      }
    }
  }

  /**
   * A method to move the character based on keyboard input.
   *
   */
  moveCharacter() {
    this.walking_sound.pause();
    this.endOfTheWorld();
    this.onlyFlyingIsMoreBeautiful();
    this.willLetTheWorldBurn();
    this.world.camera_x = -this.x + 100;
  }

  /**
   * A method that handles the scenario where the character throws a bottle.
   */
  willLetTheWorldBurn() {
    if (this.world.keyboard.D) {
      this.lastAnimationChangeTime = new Date().getTime();
    }
  }

  /**
   * A method that handles the end of the world scenario for the character.
   */
  endOfTheWorld() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.walking_sound.play();
      this.lastAnimationChangeTime = new Date().getTime();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.walking_sound.play();
      this.lastAnimationChangeTime = new Date().getTime();
    }
  }

  /**
   * Checks if the character is flying and triggers the jump action if the space key is pressed and the character is not above ground.
   * Plays the jump sound and updates the last animation change time.
   */
  onlyFlyingIsMoreBeautiful() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jump_sound.play();
      this.lastAnimationChangeTime = new Date().getTime();
    }
  }
}
