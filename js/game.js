let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;


async function init() {
    await loadLocalStorage();
    const muteButton = document.getElementById('buttonMute');
    muteButton.innerText = isMuted ? '🔇 Sound an' : '🔈 Sound aus';
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
}


function startGame() {
    canvas = document.getElementById('canvas');
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('touch-controls').style.display = 'flex';
    world = new World(canvas, keyboard);
}


function restartGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('touch-controls').style.display = 'none';
    world.soundBack.pause();
}


function showDescription() {
    document.getElementById('overlayDescription').style.display = 'flex';
}


function closeDescription() {
    document.getElementById('overlayDescription').style.display = 'none';
}


function showImpressum() {
    document.getElementById('overlayImpressum').style.display = 'flex';
}


function closeImpressum() {
    document.getElementById('overlayImpressum').style.display = 'none';
}


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


let allSounds = [
    this.soundBack,
    this.soundChicken,
    this.soundBottle,
    this.soundCoin,
    this.soundSmash,
    this.soundHurt,
    this.soundJump,
    this.soundThrow,
    this.soundChickenDead,
    this.soundEndbossDead
];


function stopAllSounds() {
    world.soundBack.pause();
}


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
    muteButton.innerText = isMuted ? '🔇 Sound an' : '🔈 Sound aus';
    saveLocalStorage();
}


function fullscreen() {
    const element = document.getElementById('game-container');
    enterFullscreen(element);
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


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


const btnL = document.getElementById('buttonL');
const btnR = document.getElementById('buttonR');
const btnU = document.getElementById('buttonU');
const btnD = document.getElementById('buttonD');


window.addEventListener('load', () => {
    if (btnL) {
        controlLeft();
    }
    if (btnR) {
        controlRight();
    }
    if (btnU) {
        controlJump();
    }
    if (btnD) {
        controlBottle();
    }
});


function controlLeft() {
    btnL.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.left = true;
    });
    btnL.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.left = false;
    });
    btnL.addEventListener('mousedown', () => keyboard.left = true);
    btnL.addEventListener('mouseup', () => keyboard.left = false);
}


function controlRight() {
    btnR.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.right = true;
    });
    btnR.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.right = false;
    });
    btnR.addEventListener('mousedown', () => keyboard.right = true);
    btnR.addEventListener('mouseup', () => keyboard.right = false);
}


function controlJump() {
    btnU.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.space = true;
    });
    btnU.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.space = false;
    });
    btnU.addEventListener('mousedown', () => keyboard.space = true);
    btnU.addEventListener('mouseup', () => keyboard.space = false);
}


function controlBottle() {
    btnD.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.d = true;
    });
    btnD.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.d = false;
    });
    btnD.addEventListener('mousedown', () => keyboard.d = true);
    btnD.addEventListener('mouseup', () => keyboard.d = false);
}


function saveLocalStorage() {
    let local_isMuted = JSON.stringify(isMuted);
    localStorage.setItem('isMuted', local_isMuted);
}


async function loadLocalStorage() {
    let local_isMuted = localStorage.getItem('isMuted');
    if (local_isMuted) {
        isMuted = JSON.parse(local_isMuted);
    }
}

