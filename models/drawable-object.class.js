class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 20;
  y = 280;
  height = 150;
  width = 100;
  sounds = [];

  /**
   * Mutes all sound objects in the sounds array.
   */
  mute() {
    this.sounds.forEach((audio) => {
      audio.muted = true;
    });
  }

  /**
   * Unmute all sounds in the list.
   */
  unmute() {
    this.sounds.forEach((audio) => {
      audio.muted = false;
    });
  }

  /**
   * A function that loads an image from the given path.
   *
   * @param {string} path - The path of the image to load.
   * @return {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws an image on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
   * @return {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * A function that loads images into an image cache.
   *
   * @param {array} arr - an array of image paths to load
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draw a frame around the object if it is an instance of specific classes.
   *
   * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof CollectableObjects ||
      this instanceof LittleChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
   * @return {void} no return value
   */
  drawOffset(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof CollectableObjects ||
      this instanceof LittleChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }
}
