class World {
  character = new Character();
  endboss = new Endboss();
  coinBar = new CoinBar();
  healthBar = new HealthBar();
  bottleBar = new BottleBar();
  endbossBar = new EndbossBar();
  coin_sound = new Audio("./audio/coin.mp3");
  bottle_sound = new Audio("./audio/bottle2.mp3");
  play_sound = new Audio("./audio/music.mp3");
  end_sound = new Audio("./audio/boss.mp3");
  boss_attack_sound = new Audio("./audio/boss.mp3");
  hit_sound = new Audio("./audio/hit.mp3");
  endboss_alert_sound = new Audio("./audio/chicken.mp3");
  win_sound = new Audio("./audio/win.mp3");
  lost_sound = new Audio("./audio/lost.mp3");
  throwableObjects = [];
  level = level1;
  canvas;
  keyboard;
  ctx;
  camera_x = 0;
  lastThrow = 0;
  sounds = [
    this.coin_sound,
    this.bottle_sound,
    this.endboss_alert_sound,
    this.hit_sound,
    this.boss_attack_sound,
    this.play_sound,
    this.end_sound,
    this.win_sound,
    this.lost_sound,
  ];

  /**
   * Initializes the canvas and keyboard, then draws the initial state, sets up the world, runs the game loop, and plays game music.
   *
   * @param {Object} canvas - The canvas element to draw on
   * @param {Object} keyboard - The keyboard input handler
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.playGameMusic();
  }

  /**
   * Mutes all sounds, character, enemies, and endboss in the level.
   */
  mute() {
    this.sounds.forEach((audio) => {
      audio.muted = true;
    });
    this.character.mute();
    this.level.enemies.forEach((enemy) => {
      enemy.mute();
    });
    this.level.endboss.forEach((endboss) => {
      endboss.mute();
    });
  }

  /**
   * Unmutes all sounds, character, enemies, and endboss in the level.
   */
  unmute() {
    this.sounds.forEach((audio) => {
      audio.muted = false;
    });
    this.character.unmute();
    this.level.enemies.forEach((enemy) => {
      enemy.unmute();
    });
    this.level.endboss.forEach((endboss) => {
      endboss.unmute();
    });
  }

  /**
   * A function that plays the game music based on certain conditions.
   *
   */
  playGameMusic() {
    setStoppableInterval(() => {
      let nearEndboss = this.endboss.x - this.character.x;
      if (this.level.endboss[0].endbossIsDead) {
        this.youWin();
      } else if (this.character.characterIsDead) {
        this.youLose();
      } else if (nearEndboss < 600) {
        this.play_sound.pause();
        this.end_sound.volume = 0.1;
        this.end_sound.play();
      } else if (nearEndboss > 600) {
        this.end_sound.pause();
        this.play_sound.volume = 0.1;
        this.play_sound.play();
      }
    }, 1000 / 10);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  youWin() {
    this.end_sound.pause();
    this.play_sound.pause();
    this.win_sound.play();
    stopGame();
    this.showYouWin();
  }

  /**
   * A description of the entire function.
   *
   */
  showYouWin() {
    let add = ["canvas", "title", "playButtons", "playDescription"];
    add.forEach((elementId) => {
      let element = document.getElementById(elementId);
      element.classList.add("d_none");
    });
    let remove = ["youWin"];
    remove.forEach((elementId) => {
      let element = document.getElementById(elementId);
      element.classList.remove("d_none");
    });
  }

  /**
   * A description of the entire function.
   *
   */
  youLose() {
    this.end_sound.pause();
    this.play_sound.pause();
    this.lost_sound.play();
    stopGame();
    this.showYouLose();
  }

  /**
   * A function to display the 'youLost' element by removing the 'd_none' class and hiding other elements.
   *
   */
  showYouLose() {
    let add = ["canvas", "title", "playButtons", "playDescription"];
    add.forEach((elementId) => {
      let element = document.getElementById(elementId);
      element.classList.add("d_none");
    });
    let remove = ["youLost"];
    remove.forEach((elementId) => {
      let element = document.getElementById(elementId);
      element.classList.remove("d_none");
    });
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Run function that sets up multiple intervals for checking different game conditions.
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollectCoin();
      this.checkCollectBottle();
      this.checkThrowObjects();
      this.checkBottleCollisionBoss();
    }, 1000 / 50);
    setStoppableInterval(() => {
      this.checkEnemyCollisionsCharacter();
      this.checkEndbossCollisionsCharacter();
      this.checkBottleCollisionEnemy();
    }, 1000 / 70);
  }

  /**
   * Check if conditions are met to throw objects and update necessary values.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleBar.amount > 0 && this.isThrow()) {
      this.bottleBar.amount--;
      this.bottleBar.setAmount();
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.lastThrow = new Date().getTime();
    }
  }

  /**
   * Determines if it's time to throw based on the time elapsed since the last throw.
   *
   * @return {boolean} true if it's time to throw, false otherwise
   */
  isThrow() {
    let timePassed = new Date().getTime() - this.lastThrow; // Difference in ms
    return timePassed > 1000;
  }

  /**
   * Check for collision between bottles and the end boss, then handle the collision accordingly.
   */
  checkBottleCollisionBoss() {
    this.throwableObjects.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (endboss.isColliding(bottle)) {
          endboss.hit();
          this.endbossBar.setPercentage(endboss.energy);
          bottle.explode();
        }
      });
    });
  }

  /**
   * Loops through the throwable objects and enemies to check for collisions between bottles and enemies,
   * triggering the hit and explode effects accordingly.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  checkBottleCollisionEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(bottle)) {
          enemy.hit();
          bottle.explode();
        }
      });
    });
  }

  /**
   * Loops through the enemies in the level and checks for collisions with the character.
   * If a collision is detected and the character is above the ground and on the way to the ground,
   * it kills the enemy after a delay, removes the enemy from the level,
   * and handles character interactions like hitting, updating healthBar, moving left, playing hit sound, and jumping.
   *
   */
  checkEnemyCollisionsCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.isOnTheWayToGround
      ) {
        enemy.killChickn();
        setTimeout(() => {
          let index = this.level.enemies.findIndex((e) => e.id === enemy.id);
          if (index > -1) this.level.enemies.splice(index, 1);
        }, 1000);
      }
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
        this.character.moveLeftHurt();
        this.hit_sound.play();
        this.character.jump();
      }
    });
  }

  /**
   * Loops through the endbosses in the level and checks for collision with the character.
   * If a collision is detected and the endboss is not dead, the character is hit, healthBar is updated, character moves left hurt, and jumps.
   */
  checkEndbossCollisionsCharacter() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss) && !endboss.isDead()) {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
        this.character.moveLeftHurt();
        this.character.jump();
      }
    });
  }

  /**
   * Loops through the coins in the level and checks for collision with the character.
   * If a collision is detected, increments the coinBar amount, sets the amount, removes the coin from the level, and plays a sound.
   */
  checkCollectCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.coinBar.amount++;
        this.coinBar.setAmount();
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
        this.coin_sound.play();
      }
    });
  }

  /**
   * Loops through the bottles in the level and checks for collision with the character.
   * If a collision is detected, increments the bottleBar amount, sets the amount, removes the bottle from the level, and plays a sound.
   *
   */
  checkCollectBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottleBar.amount++;
        this.bottleBar.setAmount();
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
        this.bottle_sound.play();
      }
    });
  }

  /**
   * Draw function to render objects on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    // ------ Space for fixed objects ------
    if (this.endboss.x - this.character.x <= 600) {
      this.addToMap(this.endbossBar);
    }
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.healthBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * A description of the entire function.
   *
   * @param {array} objects - array of objects to add to the map
   * @return {void}
   */
  addObjectsToMap(objects) {
    // o = objects
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * A function that adds movableObject to map and handles flipping the image if necessary.
   *
   * @param {type} mo - movableObject to be added
   * @return {type} description of return value
   */
  addToMap(mo) {
    // mo = movableObject
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    // mo.drawOffset(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the given image horizontally.
   *
   * @param {Object} mo - the image object to be flipped
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image back.
   *
   * @param {type} mo - description of mo
   * @return {type} description of return value
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
