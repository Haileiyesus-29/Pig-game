'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

let currentScore = 0;
dice.classList.add('hidden');

btnRoll.addEventListener('click', () => {
  randomize();
});

btnHold.addEventListener('click', () => {
  save();
});

btnNew.addEventListener('click', () => {
  newGame();
});

function randomize() {
  dice.classList.remove('hidden');
  const activePlayerCurrent = document.querySelector(
    '.player--active .current-score'
  );
  const random = Math.ceil(Math.random() * 6);
  dice.setAttribute('src', `dice-${random}.png`);

  if (random != 1) {
    currentScore += random;
    activePlayerCurrent.innerHTML = currentScore;
  } else {
    currentScore = 0;
    activePlayerCurrent.innerHTML = currentScore;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
}

function save() {
  const activePlayerCurrent = document.querySelector(
    '.player--active .current-score'
  );
  const activePlayerScore = document.querySelector('.player--active .score');
  let score = +activePlayerScore.textContent;
  score += +activePlayerCurrent.textContent;
  activePlayerScore.innerHTML = score;
  if (activePlayerScore.textContent >= 100) {
    activePlayerScore.innerHTML = 100;
    activePlayerCurrent.innerHTML = currentScore;
    // if(activePlayerCurrent.parentElement.parentElement.classList.contains('player--0'))

    if (
      activePlayerCurrent.parentElement.parentElement.classList.contains(
        `player--0`
      )
    ) {
      gameWin(player0);
    } else {
      gameWin(player1);
    }
    return;
  }
  score = 0;
  activePlayerCurrent.innerHTML = 0;

  currentScore = 0;
  activePlayerCurrent.innerHTML = currentScore;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function gameWin(player) {
  dice.classList.add('hidden');
  player.classList.add('player--winner');
  btnHold.setAttribute('disabled', '');
  btnRoll.setAttribute('disabled', '');
}

function newGame() {
  dice.classList.add('hidden');
  btnHold.removeAttribute('disabled');
  btnRoll.removeAttribute('disabled');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  score0.innerHTML = 0;
  score1.innerHTML = 0;
  current0.innerHTML = 0;
  current1.innerHTML = 0;
  currentScore = 0;
}
