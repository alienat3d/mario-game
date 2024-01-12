"use strict";

const player = document.querySelector('#player');
const damper = document.querySelector('#damper');
const button = document.querySelector('.start');

let isStart = false; // 2.4 Создадим изменяемую переменную для проверки запущена ли игра.
let interval;
const activeJump = () => {
  // 2.7 Ну а прыжок будем осуществлять только при условии, что игра запущена.
  /*if (isStart === true) {
    console.log('jump');
  }*/ // Такую запись мы можем сократить до:
  if (isStart) {
    // Нам нужно узнать есть ли класс 'active' на блоке '#player' и если его нет, то надо его добавлять.
    if (!player.classList.contains('active')) {
      player.classList.add('active')
    }
    // Но нам ведь ещё нужно, чтобы Марио прыгал по каждому нажатию, для этого нужно сделать таймер, который чистил бы класс с анимацией прыжка после прыжка (500 мс, т.к. в стилях в анимации прыжка у нас тоже 0.3s).
    setTimeout(() => {
      player.classList.remove('active')
    }, 500)
  }
};
// 1. Повесим слушатель нажатия на любую кнопку.
// 2.1 Но если мы нажимаем много раз старт, то повесится множество слушателей, а нам этого совсем не нужно, поэтому исправляем этот момент убирая из startGame в общий document.
const startGame = () => {
  // 2.5 Теперь, когда игра запустится, то поменяем isStart на true.
  isStart = true;
  // document.addEventListener('keydown', activeJump); 2.2 убран
  damper.classList.add('animate');

  // 3.1 Нам также необходимо, чтобы игра заканчивалась, если черепаха врежется в Марио. Наше интервальное выражение будет происходить каждые 10 миллисекунд.
  interval = setInterval(() => {
    // 3.2 Достанем из объекта player стили и его свойство "top", а parseInt() вернёт нам только число.
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'))
    // 3.3 Также получим левую сторону квадратика нашей черепашки.
    let damperLeft = parseInt(window.getComputedStyle(damper).getPropertyValue('left'))
    // 3.4 И создадим условие, при котором игра будет уходить в Game Over.
    // 3.5 Но также по завершении нам нужно почистить интервал. Для этого выше создадим переменную interval и затем в endGame() применим к интервалу метод clearInterval().
    if (damperLeft < 40 && damperLeft > 0 && playerTop >= 140) {
      endGame();
    }
  }, 10)
};
const endGame = () => {
  // 2.6 А когда игра закончится, то поменяем isStart на false.
  isStart = false;

  clearInterval(interval);

  damper.classList.remove('animate')

  alert('GAME OVER! Press "Start" button to start again!');
};
// 2.3 Но только нам нужно ограничение, что пока не нажата кнопка старт, прыжок бы не обрабатывался.
document.addEventListener('keydown', activeJump);

button.addEventListener('click', () => {
  startGame();
});