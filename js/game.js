let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;

/**
 * Initializes the game by selecting the canvas and creating a new World instance.
 *
 * @return {Promise<void>}
 */
async function initGame() {
  canvas = document.querySelector("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let btnThrow = document.getElementById("btnThrow");
  let btnJump = document.getElementById("btnJump");
  let btnLeft = document.getElementById("btnLeft");
  let btnRight = document.getElementById("btnRight");

  /**
   * A function that handles touch events to update the keyboard state.
   *
   * @param {Event} event - the touch event to handle
   * @param {string} key - the key associated with the touch event
   * @return {void}
   */
  function handleTouch(event, key) {
    if (event.type === "touchstart") {
      keyboard[key] = true;
    } else if (event.type === "touchend") {
      keyboard[key] = false;
    };
    event.preventDefault();
  }

  btnThrow.addEventListener("touchstart", (event) => handleTouch(event, "D"));
  btnThrow.addEventListener("touchend", (event) => handleTouch(event, "D"));
  btnJump.addEventListener("touchstart", (event) => handleTouch(event, "SPACE"));
  btnJump.addEventListener("touchend", (event) => handleTouch(event, "SPACE"));
  btnLeft.addEventListener("touchstart", (event) => handleTouch(event, "LEFT"));
  btnLeft.addEventListener("touchend", (event) => handleTouch(event, "LEFT"));
  btnRight.addEventListener("touchend", (event) => handleTouch(event, "RIGHT"));
  btnRight.addEventListener("touchstart", (event) => handleTouch(event, "RIGHT"));
});

/**
 * Initializes the game by selecting the canvas element and creating a new World instance.
 *
 */
function startGame() {
  showGame();
  initlevel();
  initGame();
  if (window.innerWidth <= 890) {
    document.getElementById("playButtons").classList.remove("d_none");
  }
}

/**
 * Function to show the game elements by manipulating their visibility.
 *
 */
function showGame() {
  let add = ["start", "welcome"];
  add.forEach((elementId) => {
    let element = document.getElementById(elementId);
    element.classList.add("d_none");
  });
  let remove = ["canvas", "title", "playDescription", "soundToggle"];
  remove.forEach((elementId) => {
    let element = document.getElementById(elementId);
    element.classList.remove("d_none");
  });
}

/**
 * Function to reset the game to its initial state by hiding certain elements and showing the start screen.
 */
function backToStart() {
  let add = ["imprint", "soundToggle", "howToPlay", "youLost", "youWin"];
  add.forEach((elementId) => {
    let element = document.getElementById(elementId);
    element.classList.add("d_none");
  });
  let remove = ["start", "welcome"];
  remove.forEach((elementId) => {
    let element = document.getElementById(elementId);
    element.classList.remove("d_none");
  });
}

/**
 * Function to show the imprint element while hiding the start and welcome elements.
 *
 */
function showImprint() {
  let start = document.getElementById("start");
  let welcome = document.getElementById("welcome");
  let imprint = document.getElementById("imprint");
  imprint.classList.remove("d_none");
  start.classList.add("d_none");
  welcome.classList.add("d_none");
}

/**
 * Displays instructions on how to play the game.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function showHowToPlay() {
  let start = document.getElementById("start");
  let welcome = document.getElementById("welcome");
  let howToPlay = document.getElementById("howToPlay");
  welcome.classList.add("d_none");
  howToPlay.classList.remove("d_none");
  start.classList.add("d_none");
}

/**
 * Sets up a stoppable interval that repeatedly calls a function at a specified time interval.
 *
 * @param {function} fn - The function to be called repeatedly.
 * @param {number} time - The time interval between function calls.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Stops the game by clearing all intervals.
 *
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
}

/**
 * Check the orientation of the window and call the corresponding mode function.
 *
 */
function checkOrientation() {
  if (window.innerWidth <= 890) {
    if (window.innerWidth > window.innerHeight) {
      // Landscape mode
      landscapeMode();
    } else {
      // Portrait mode
      portraitMode();
    }
  }
}

/**
 * Changes the display to landscape mode by showing specific elements and hiding others.
 */
function landscapeMode() {
  let elements = ["start", "welcome"];
  elements.forEach((elementId) => {
    let element = document.getElementById(elementId);
    element.classList.remove("d_none");
  });
  document.getElementById("changeInformation").classList.add("d_none");
}

/**
 * Function to set up the portrait mode by hiding specific elements and showing 'changeInformation', then stopping the game.
 */
function portraitMode() {
  let elements = [
    "start",
    "welcome",
    "imprint",
    "howToPlay",
    "youLost",
    "youWin",
    "playButtons",
    "canvas",
    "title",
  ];
  elements.forEach((elementId) => {
    let element = document.getElementById(elementId);
    element.classList.add("d_none");
  });
  document.getElementById("changeInformation").classList.remove("d_none");
  stopGame();
}

document.addEventListener("DOMContentLoaded", function () {
  checkOrientation();
});

window.addEventListener("resize", function () {
  checkOrientation();
});

document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("soundToggle");
  let isActive = false;

  button.addEventListener("click", function () {
    isActive = !isActive;
    if (isActive) {
      button.src = "./icons/no_sound.png";
      world.mute();
    } else {
      button.src = "./icons/sound.png";
      world.unmute();
    }
  });
});
