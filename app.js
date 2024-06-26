const startBtn = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector(".board");

let time = 0;
let score = 0;
blunders = 0;

const colors = [
  "#1ba520",
  "#bc17d5",
  "#36e307",
  "#f32b4d",
  "#dcb126",
  "#3204f9",
  "#f17624",
  "#870df6",
];

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  } else {
    if (time !== 0) {
      board.style.background = "brown";
      blunders++;
      setTimeout(function () {
        board.style.color = board.style.background =
          "linear-gradient(10deg, #102d4e 0%, #1f4e80 100%)";
      }, 300);
    }
  }
});

//DEBUG
// startGame();

function startGame() {
  setInterval(decreacseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreacseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.remove();
  board.innerHTML = `
  <div>
  <h1> Счет: <span class='primary'>${score}</span></h1>
  <h2> Промахи: <span class='primary'>${blunders}</span></h2>
  </div>
  `;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);

  const { width, height } = board.getBoundingClientRect();

  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.background = getRandomColor();

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
