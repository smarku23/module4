const words = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
let currentWord = '';
let guessedWord = [];
let timer = 60;
let wins = 0;
let losses = 0;
let timerInterval;
//60 second timer 5 words that can be guessed
function startGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(currentWord.length).fill('_');
  timer = 60;
  updateDisplay();
  document.getElementById('game-container').style.display = 'block';
  document.querySelector('button').style.display = 'none';
  startTimer();
}
//set word lenghth to condinate with word to be guessed 
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').textContent = timer;

    if (timer <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
}//timer count down 

function updateDisplay() {
  document.getElementById('word-display').textContent = guessedWord.join(' ');
  document.getElementById('wins').textContent = wins;
  document.getElementById('losses').textContent = losses;
}
//keep track of wins and losses
function checkGuess() {
  const guessInput = document.getElementById('guess-input');
  const guess = guessInput.value.toLowerCase();

  if (guess.length === 1 && /[a-z]/.test(guess)) {
    if (currentWord.includes(guess)) {
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === guess) {
          guessedWord[i] = guess;
        }
      }
      if (!guessedWord.includes('_')) {
        clearInterval(timerInterval);
        endGame(true);
      }
    } else {
      timer -= 3; // Subtract 3 seconds for incorrect guesses
    }

    guessInput.value = '';
    updateDisplay();
  } else {
    alert('Please enter a valid single letter.');
  } //letter enter
}

function endGame(isWinner) {
  document.getElementById('game-container').style.display = 'none';
  document.querySelector('button').style.display = 'block';

  if (isWinner) {
    wins++;
    alert('Congratulations! You guessed the word!');
  } else {
    losses++;
    alert('Sorry, you ran out of time. The word was: ' + currentWord);
  } //alerted when time was running/ran out 

  updateDisplay();
}