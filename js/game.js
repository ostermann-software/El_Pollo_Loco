/**
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * @type {World}
 */
let world;

/**
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Indicates whether the game is muted.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Initializes the game. Loads local storage and sets up UI.
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    await loadLocalStorage();
    const muteButton = document.getElementById('buttonMute');
    muteButton.innerText = isMuted ? '🔇 Sound on' : '🔈 Sound off';
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
}

/**
 * Starts the game by creating a new World instance and updating UI.
 */
function startGame() {
    canvas = document.getElementById('canvas');
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('touch-controls').style.display = 'flex';
    world = new World(canvas, keyboard);
}

/**
 * Restarts the game by resetting UI and pausing background sound.
 */
function restartGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('touch-controls').style.display = 'none';
    world.soundBack.pause();
}

/**
 * Shows the game description overlay.
 */
function showDescription() {
    document.getElementById('overlayDescription').style.display = 'flex';
}

/**
 * Closes the game description overlay.
 */
function closeDescription() {
    document.getElementById('overlayDescription').style.display = 'none';
}

/**
 * Shows the legal notice (impressum) overlay.
 */
function showImpressum() {
    document.getElementById('overlayImpressum').style.display = 'flex';
}

/**
 * Closes the legal notice (impressum) overlay.
 */
function closeImpressum() {
    document.getElementById('overlayImpressum').style.display = 'none';
}

/**
 * Displays the game over screen with the appropriate image.
 * @param {boolean} win - Indicates if the player has won.
 */
function showGameOverScreen(win) {
    if (win) {
        document.getElementById('game-over-pic').src = "img/9_intro_outro_screens/game_over/end_win.png";
    } else {
        document.getElementById('game-over-pic').src = "img/9_intro_outro_screens/game_over/end_lost.png";
    }
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('touch-controls').style.display = 'none';
    setTimeout(() => {
        document.getElementById('game-over-screen').classList.add('visible');
    }, 50);
    stopAllSounds();
}

/**
 * Pauses all sounds in the game.
 */
function stopAllSounds() {
    world.soundBack.pause();
}

/**
 * Toggles the mute state and updates UI and local storage.
 */
function toggleMuteState() {
    if (typeof world !== 'undefined' && world.soundBack) {
        if (!isMuted) {
            world.soundBack.play().catch((e) => {
                if (e.name !== 'AbortError') console.warn(e);
            });
        } else {
            world.soundBack.pause();
        }
    }
    const muteButton = document.getElementById('buttonMute');
    muteButton.innerText = isMuted ? '🔇 Sound on' : '🔈 Sound off';
    saveLocalStorage();
}

/**
 * Requests fullscreen mode for the game container.
 */
function fullscreen() {
    const element = document.getElementById('game-container');
    enterFullscreen(element);
}

/**
 * Enters fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to set fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Saves the mute state to local storage.
 */
function saveLocalStorage() {
    let local_isMuted = JSON.stringify(isMuted);
    localStorage.setItem('isMuted', local_isMuted);
}

/**
 * Loads the mute state from local storage.
 * @async
 * @returns {Promise<void>}
 */
async function loadLocalStorage() {
    let local_isMuted = localStorage.getItem('isMuted');
    if (local_isMuted) {
        isMuted = JSON.parse(local_isMuted);
    }
}

/**
 * Sets up keyboard listeners for keydown and keyup events.
 */
window.addEventListener("keydown", (e) => {
    if (e.key === 'ArrowLeft') {
        keyboard.left = true;
    } else if (e.key === 'ArrowRight') {
        keyboard.right = true;
    } else if (e.key === 'ArrowUp') {
        keyboard.up = true;
    } else if (e.key === 'ArrowDown') {
        keyboard.down = true;
    } else if (e.key === ' ') {
        keyboard.space = true;
    } else if (e.key === 'd') {
        keyboard.d = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key === 'ArrowLeft') {
        keyboard.left = false;
    } else if (e.key === 'ArrowRight') {
        keyboard.right = false;
    } else if (e.key === 'ArrowUp') {
        keyboard.up = false;
    } else if (e.key === 'ArrowDown') {
        keyboard.down = false;
    } else if (e.key === ' ') {
        keyboard.space = false;
    } else if (e.key === 'd') {
        keyboard.d = false;
    }
});

/**
 * Initializes touch and mouse controls after page load.
 */
window.addEventListener('load', () => {
    const btnL = document.getElementById('buttonL');
    const btnR = document.getElementById('buttonR');
    const btnU = document.getElementById('buttonU');
    const btnD = document.getElementById('buttonD');
    if (btnL) controlLeft(btnL);
    if (btnR) controlRight(btnR);
    if (btnU) controlJump(btnU);
    if (btnD) controlBottle(btnD);
});

/**
 * Sets up controls for moving left.
 * @param {HTMLElement} btnL - The left button element.
 */
function controlLeft(btnL) {
    btnL.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    }, { passive: false });
    btnL.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    }, { passive: false });
    btnL.addEventListener('mousedown', () => keyboard.left = true);
    btnL.addEventListener('mouseup', () => keyboard.left = false);
}

/**
 * Sets up controls for moving right.
 * @param {HTMLElement} btnR - The right button element.
 */
function controlRight(btnR) {
    btnR.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    }, { passive: false });
    btnR.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    }, { passive: false });
    btnR.addEventListener('mousedown', () => keyboard.right = true);
    btnR.addEventListener('mouseup', () => keyboard.right = false);
}

/**
 * Sets up controls for jumping (space).
 * @param {HTMLElement} btnU - The up button element.
 */
function controlJump(btnU) {
    btnU.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    }, { passive: false });
    btnU.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.space = false;
    }, { passive: false });
    btnU.addEventListener('mousedown', () => keyboard.space = true);
    btnU.addEventListener('mouseup', () => keyboard.space = false);
}

/**
 * Sets up controls for throwing bottles (key 'd').
 * @param {HTMLElement} btnD - The down button element.
 */
function controlBottle(btnD) {
    btnD.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.d = true;
    }, { passive: false });
    btnD.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.d = false;
    }, { passive: false });
    btnD.addEventListener('mousedown', () => keyboard.d = true);
    btnD.addEventListener('mouseup', () => keyboard.d = false);
}

/**
 * Sets up mute button controls for click and keyboard input.
 */
window.addEventListener('DOMContentLoaded', () => {
    const muteButton = document.getElementById('buttonMute');
    muteButton.addEventListener('click', (event) => {
        if (event.pointerType === 'mouse' || event instanceof MouseEvent) {
            isMuted = !isMuted;
            toggleMuteState();
        }
    });
    muteButton.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
        }
    });
});
