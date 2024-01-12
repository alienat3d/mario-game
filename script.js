"use strict";

const player = document.querySelector('#player'),
  damper = document.querySelector('#damper'),
  button = document.querySelector('.start');

let isStart = false,
  interval;

const activeJump = () => {
  if (isStart) {
    if (!player.classList.contains('active')) {
      player.classList.add('active')
    }

    setTimeout(() => player.classList.remove('active'), 500)
  }
};

const startGame = () => {
  isStart = true;
  damper.classList.add('animate');

  interval = setInterval(() => {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top')),
      damperLeft = parseInt(window.getComputedStyle(damper).getPropertyValue('left'))

    if (damperLeft < 40 && damperLeft > 0 && playerTop >= 140) {
      endGame();
    }
  }, 10)
};
const endGame = () => {
  isStart = false;

  clearInterval(interval);

  damper.classList.remove('animate')

  alert('GAME OVER! Press "Start" button to start again!');
};

document.addEventListener('keydown', activeJump);

button.addEventListener('click', () => startGame());