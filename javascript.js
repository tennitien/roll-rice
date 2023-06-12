'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// ========FUNCTION========
let random, activePlayer, score, currentScore, playing;
const init = function () {
  playing = true;
  activePlayer = 0;
  score = [0, 0];
  currentScore = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  score0El.textContent = 0;
  score1El.textContent = 0;
};

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  // **css
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};
// ========================
init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    random = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${random}.png`;
    if (random !== 1) {
      currentScore += random;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 50) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
