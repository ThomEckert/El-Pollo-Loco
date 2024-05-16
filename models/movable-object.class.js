class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  lastAnimationChangeTime = 0;
  isOnTheWayToGround = false;

  /**
   * Apply gravity to the object's vertical position.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this.speedY < 0) {
        this.isOnTheWayToGround = true;
      } else {
        this.isOnTheWayToGround = false;
      }
    }, 1000 / 25);
  }

  /**
   * Decreases the energy by 5. If energy is less than 0, sets energy to 0. Otherwise, updates lastHit with the current time.
   *
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * A description of the entire function.
   *
   */
  killChickn() {
    this.energy = 0;
  }

  /**
   * Check if the object is hurt based on the time elapsed since the last hit.
   *
   * @return {boolean} true if hurt, false if not hurt
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    return timePassed < 1000;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throable object should always fall
      return this.y < 375;
    } else {
      return this.y < 151;
    }
  }

  /**
   * Check if this object is colliding with another object.
   *
   * @param {Object} obj - The other object to check for collision with.
   * @return {boolean} Returns true if there is a collision, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left && // R -> L
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top && // T -> B
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right && // L -> R
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom // B -> T
    ); 
  }

  /**
   * Move the object to the right by increasing its x-coordinate by the current speed.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Play the animation with the given images.
   *
   * @param {array} images - Array of image paths for the animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  jump() {
    this.speedY = 30;
  }
}
