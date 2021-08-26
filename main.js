'use strict';

const playBtn = document.querySelector('.play-btn');
const section = document.querySelector('section');
const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');
const time = document.querySelector('.time');
const replay = document.querySelector('.replay');
const number = document.querySelector('.number');

const sectionWidth = section.getBoundingClientRect().width;
const sectionHeight = section.getBoundingClientRect().height;

let maxX = sectionWidth - 100;
let maxY = sectionHeight - 100;

playBtn.addEventListener('click', (event) => {
  randomPosition(carrots);
  randomPosition(bugs);

  // 2. play-btn이 stop-btn으로 바뀜.
  playBtn.innerHTML = '<i class="fas fa-stop"></i>';

  countDown();
});

// 1. 화면 아래쪽에 bug 7, carrot 10개 랜덤배치
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

// 3. time에서 10초부터 거꾸로 카운트 다운
function countDown() {
  let seconds = 9;
  let interval = setInterval(() => {
    time.textContent = `0:${seconds}`;
    seconds--;
    if (seconds < 0) {
      replay.style.visibility = 'visible';
      replay.clearInterval(interval);
    }
  }, 1000);
}

// 4. number에서 10개를 나타내고, carrot이 줄어들 때마다 줄어듬.
section.addEventListener('click', (e) => {
  if (e.target.classList.contains('carrot')) {
    let beforeNum = number.textContent;
    number.textContent = beforeNum - 1;
    e.target.style.visibility = 'hidden';
  }
});

// STOP, LOST, WON
// 1. stop-btn을 누르면
//    시간이 0초가 되거나, bug를 클릭하면
//    당근을 모두 찾으면
// 2. stop-btn 보이지 않고,
// 3. replay가 보이고, 상황에 해당하는 replay-message가 보임.
// 4. time이 멈춤.

// replay-btn을 누르면
// play-btn 누른 것과 같음.
