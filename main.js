'use strict';

const playBtn = document.querySelector('.play-btn');
const section = document.querySelector('section');
const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');
const time = document.querySelector('.time');
const number = document.querySelector('.number');
const replay = document.querySelector('.replay');
const replayBtn = document.querySelector('.replay-btn');
const replayMessage = document.querySelector('.replay-message');

const sectionWidth = section.getBoundingClientRect().width;
const sectionHeight = section.getBoundingClientRect().height;

let maxX = sectionWidth - 100;
let maxY = sectionHeight - 100;

playBtn.addEventListener('click', () => {
  countDown();

  randomPosition(carrots);
  randomPosition(bugs);

  playBtn.innerHTML = '<i class="fas fa-stop"></i>';
  playBtn.classList.replace('play-btn', 'stop-btn');
  document.querySelector('.stop-btn').addEventListener('click', (e) => {
    e.currentTarget.style.visibility = 'hidden';
    e.currentTarget.classList.replace('stop-btn', 'play-btn');
    replay.style.visibility = 'visible';
    replayMessage.textContent = 'REPLAY?';
  });
});

section.addEventListener('click', (e) => {
  if (e.target.classList.contains('carrot')) {
    let beforeNum = number.textContent;
    if (beforeNum === '1') {
      replay.style.visibility = 'visible';
    }
    number.textContent = beforeNum - 1;
    e.target.style.visibility = 'hidden';
  }
  if (e.target.classList.contains('bug')) {
    replay.style.visibility = 'visible';
    replayMessage.textContent = 'YOU LOST!';
  }
});

replayBtn.addEventListener('click', () => {
  playBtn.style.visibility = 'visible';
  replay.style.visibility = 'hidden';

  randomPosition(carrots);
  randomPosition(bugs);

  playBtn.innerHTML = '<i class="fas fa-stop"></i>';
  playBtn.classList.replace('play-btn', 'stop-btn');
  document.querySelector('.stop-btn').addEventListener('click', (e) => {
    e.currentTarget.style.visibility = 'hidden';
    e.currentTarget.classList.replace('stop-btn', 'play-btn');
    replay.style.visibility = 'visible';
    replayMessage.textContent = 'REPLAY?';
  });

  countDown();
});

function randomPosition(carrots) {
  carrots.forEach((carrot) => {
    carrot.style.visibility = 'visible';
    carrot.style.transform = `translate(${getRandomArbitrary(
      0,
      maxX
    )}px, ${getRandomArbitrary(0, maxY)}px)`;
  });
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function countDown() {
  let seconds = 9;
  let interval = setInterval(() => {
    time.textContent = `0:${seconds}`;
    seconds--;
    if (seconds < 0) {
      clearInterval(interval);
      replay.style.visibility = 'visible';
      replayMessage.textContent = 'YOU LOST!';
    }
  }, 1000);
}
